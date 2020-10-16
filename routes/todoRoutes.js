const express = require('express');
const router = express.Router();

const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');


router.get('/', getTodos);

router.get('/:todoId', getTodoById);

router.post('/', createTodo);

router.put('/:todoId', updateTodo);

router.delete('/:todoId', deleteTodo);


module.exports = router;