var express = require('express');
var router = express.Router();
const multer = require('multer'); // Import Multer
const indexrouter = require('../controller/index');

// Define Multer storage and setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Set your upload directory here
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', indexrouter.getIndexPage);

// Handle file upload using Multer middleware before the route handler
router.post('/upload', upload.single('file'), indexrouter.uploadFile);

router.get('/download/:id', indexrouter.download);
module.exports = router;