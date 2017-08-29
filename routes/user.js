var express = require('express');
var router = express.Router();

var user_controller = require(__base + 'controllers/user');

/* CRUD for user */
router.post('/', user_controller.create);
router.get('/:id', user_controller.get);
router.put('/:id', user_controller.update);
router.delete('/:id', user_controller.delete);

module.exports = router;
