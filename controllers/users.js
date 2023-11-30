const User = require('../models/user');
const Plant = require('../models/plant');

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const { v4: uuidv4 } = require('uuid');
const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  signup,
  login,
  profile
};

async function signup(req, res) {
  console.log('hitting signup router');
  console.log(req.body, '<- contents of the form', req.file, '<- this is req.file');

  if (!req.file) return res.status(400).json({ error: 'Please submit a photo' });

  const filePath = `plantpal/${uuidv4()}-${req.file.originalname};` // uuidv4 adds a random id before the file name in case two users upload files with the same name (or same user uploading multiple photos with same file name)
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }
  console.log(params, '<--- params');
  s3.upload(params, async function (err, data) {
    if (err) {
      console.log('==========================');
      console.log(err, '<- error from aws, probably wong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?');
      console.log('==========================');
    }

    const user = new User({ ...req.body, photoUrl: data.Location });

    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      console.log(err);
      // Probably a duplicate email
      res.status(400).json(err);
    }
  })

}

async function login(req, res) {

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: 'bad credentials' });
    user.comparePassword(req.body.password, (err, isMatch) => {

      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: 'bad credentials' });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
}

async function profile(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const plants = await Plant.find({user: user._id}).populate('user').exec();

    res.status(200).json({data: plants, user: user})
  } catch (error) {
    return res.status(400).json(error); // Question: What is difference between 400 and 401 errors?

  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}
