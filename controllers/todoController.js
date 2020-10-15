const TodoModel = require('../models/todoModel');


const createTodo = async (req, res, next) => {
    try {
        const createdTodo = await TodoModel.create(req.body);

        res.status(201).json(createdTodo);
    } catch (error) {
        next(error);
    }
};

const getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find();

        res.status(200).json(allTodos);
    } catch (error) {
        next(error);
    }
};




module.exports = {
    createTodo,
    getTodos
};