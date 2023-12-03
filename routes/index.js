var express = require('express');
var router = express.Router();
const indexrouter = require('../controller/index');
/* GET home page. */
router.get('/', indexrouter.getIndexPage);
router.post('/upload', indexrouter.getIndexPage);
router.get('/download/:id', indexrouter.download);
module.exports = router;
