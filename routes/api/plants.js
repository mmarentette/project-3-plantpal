const express = require('express');
const router = express.Router();
const plantsCtrl = require('../../controllers/plants');

const multer = require('multer');
const upload = multer();

/*---------- Public Routes ----------*/
// All routes start with /api/plants
router.post('/', upload.single('photo'), plantsCtrl.create);
router.get('/', plantsCtrl.index);
router.delete('/:plantId', plantsCtrl.deletePlant);

/*---------- Protected Routes ----------*/

module.exports = router;