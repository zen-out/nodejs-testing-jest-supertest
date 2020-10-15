const express = require('express');
const router = express.Router();

const { createTodo, getTodos } = require('../controllers/todoController');


router.get('/', getTodos);

router.post('/', createTodo);


module.exports = router;