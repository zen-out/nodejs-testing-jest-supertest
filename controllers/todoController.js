const TodoModel = require('../models/todoModel');


const getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find();

        res.status(200).json(allTodos);
    } catch (error) {
        next(error);
    }
};

const getTodoById = async (req, res, next) => {
    try {
        const todo = await TodoModel.findById(req.params.todoId);

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const createdTodo = await TodoModel.create(req.body);

        res.status(200).json(createdTodo);
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            { new: true }
        );

        if (!updatedTodo) res.status(404).json({ message: `Could not find todo with ID: ${req.params.todoId}` });

        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);

        if (!deletedTodo) res.status(404).json({ message: `Could not find a todo with ID: ${req.params.todoId}` });

        res.status(200).json(deletedTodo);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};