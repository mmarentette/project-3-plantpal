const express = require('express');
const router = express.Router();
const plantsCtrl = require('../../controllers/plants');

const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), plantsCtrl.create);
router.get('/', plantsCtrl.index);

/*---------- Protected Routes ----------*/

module.exports = router;