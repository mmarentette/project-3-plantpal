const Plant = require('../models/plant');

const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const { v4: uuidv4 } = require('uuid');
const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
    show,
    deletePlant
};

function create(req, res) {
    console.log(req.file, '<--- req.file', req.body, '<--- req.body', req.user, '<---req.user');
    // Guard in case no file is sent
    if (!req.file) return res.status(400).json({ error: 'Please submit a photo' });
    // Submit file to AWS
    const filePath = `plantpal/${uuidv4()}-${req.file.originalname}`;
    const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };
    s3.upload(params, async function (err, data) { // data is the response from AWS
        if (err) {
            console.log('==========================');
            console.log(err, '<- error from aws, probably wong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?');
            console.log('==========================');
        }

        try {
            const plantDoc = await Plant.create({
                user: req.user, // req.user is from the JWT (token) the client sent over; config/auth is where req.user is set from the token
                commonName: req.body.commonName, // req.body contains the text inputs from the form request
                photoUrl: data.Location // data.Location is where the file is stored in AWS
            })

            await plantDoc.populate('user'); // Question: Why don't I need .exec() here?

            // Respond to client
            // Status 201 means a resource was created
            res.status(201).json({ plant: plantDoc })

        } catch (error) {
            console.log(error, '<--- Error creating a plant (controller)');
            res.json({ error: 'Error creating a plant' });

        }

    })
    // res.json({ data: 'hitting create' }); // Question: Before I removed this line of code, I was getting an Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client - is it because we already responded to the client in the try/catch block and we can only respond to the client once?
}

async function index(req, res) {
    try {
        const plants = await Plant.find({}).populate("user").sort({ 'createdAt': 'desc' });
        res.status(200).json({ plants });
    } catch (error) {
        console.log(error, '<--- Error reading all plants (controller)');
        res.json({ error: 'Error reading all plants' });
    }
}

async function show(req, res) {
    console.log(req.params.plantId, '<--- req.params.plantId');
    try {
        const plantDoc = await Plant.findById(req.params.plantId);
        if (!plantDoc) return res.status(404).json({ error: 'Plant not found' });
        console.log(plantDoc, '<---- plant doc');
        res.status(200).json({ plant: plantDoc });
    } catch (error) {
        console.log(error, '<--- Error displaying plant details (controller)');
        res.json({ error: 'Error displaying plant details' });
    }
}

async function deletePlant(req, res) {
    try {
        await Plant.findOneAndDelete({ _id: req.params.plantId, user: req.user._id })
        res.json({ data: 'Plant removed' });
    } catch (error) {
        console.log(error, '<- Error deleting a plant (controller)');
        res.json({ error: 'Error deleting a plant' })

    }
}
