var express = require('express');
var router = express.Router();

var index_controller = require(__base + 'controllers/index');

/* GET home page. */
router.post('/authenticate', index_controller.login);

module.exports = router;
