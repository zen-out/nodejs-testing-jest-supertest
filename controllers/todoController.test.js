const httpMocks = require('node-mocks-http');

const todoController = require('./todoController');
const TodoModel = require('../models/todoModel');

const newTodo = require('../test/mocks/newTodo.json');
const allTodos = require('../test/mocks/allTodos.json');
const todoById = require('../test/mocks/todoById.json');


jest.mock('../models/todoModel');


let req, res, next;
const todoId = '5f881ee7e2504f70c418e34a';

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});


describe('getTodoById', () => {
    test('if todoController has a getTodoById function', () => {
        expect(typeof todoController.getTodoById).toBe('function');
    });

    test('if getTodoById calls TodoModel.find', async () => {
        req.params.todoId = todoId;
        req.body = newTodo;

        await todoController.getTodoById(req, res);

        expect(TodoModel.findById).toBeCalledWith(todoId);
    });

    test("if the servers returns a response with status 200 and a todo model", async () => {
        TodoModel.findById.mockReturnValue(todoById);

        await todoController.getTodoById(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(todoById);
    });

    test('if the server returns an error when the request fails', async () => {
        const errorMessage = { message: 'Could not get todos' };
        const rejectedPromise = Promise.reject(errorMessage);

        TodoModel.find.mockReturnValue(rejectedPromise);
        await todoController.getTodos(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('getTodos', () => {
    test('if todoController has a getTodos function', () => {
        expect(typeof todoController.getTodos).toBe('function');
    });

    test('if getTodos calls TodoModel.find', () => {
        todoController.getTodos(req, res);

        expect(TodoModel.find).toBeCalledWith();
    });

    test("if the servers returns a response with status 200 and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos);

        await todoController.getTodos(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    test('if the server returns an error when the request fails', async () => {
        const errorMessage = { message: 'Could not get todos' };
        const rejectedPromise = Promise.reject(errorMessage);

        TodoModel.find.mockReturnValue(rejectedPromise);
        await todoController.getTodos(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('createTodo', () => {
    beforeEach(async () => {
        req.body = newTodo;
    });

    test('if todoController has a createTodo function', () => {
        expect(typeof todoController.createTodo).toBe('function');
    });

    test('if createTodo calls TodoModel.create', () => {
        todoController.createTodo(req, res);

        expect(TodoModel.create).toBeCalledWith(newTodo);
    });

    test('if the server returns status code 200 and the JSON body in the response', async () => {
        TodoModel.create.mockReturnValue(newTodo);

        await todoController.createTodo(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    test('if the server returns an error when an invalid request is being made', async () => {
        const errorMessage = { message: 'Done property is missing' };
        const rejectedPromise = Promise.reject(errorMessage);

        TodoModel.create.mockReturnValue(rejectedPromise);
        await todoController.createTodo(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('updateTodo', () => {
    beforeEach(async () => {
        req.body = newTodo;
    });

    test('if todoController has a updateTodo function', () => {
        expect(typeof todoController.updateTodo).toBe('function');
    });

    test('if updateTodo calls TodoModel.findByIdAndUpdate', () => {
        req.params.todoId = todoId;
        req.body = newTodo;

        todoController.updateTodo(req, res);

        expect(TodoModel.findByIdAndUpdate).toBeCalledWith(todoId, newTodo, { new: true });
    });

    test('if the server returns status code 200 and the JSON body in the response', async () => {
        TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);

        await todoController.updateTodo(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    test('if the server returns an error when an invalid request is being made', async () => {
        const errorMessage = { message: 'Could not find a todo with that ID.' };
        const rejectedPromise = Promise.reject(errorMessage);

        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await todoController.updateTodo(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('deleteTodo', () => {
    beforeEach(async () => {
        req.params.todoId = todoId;
    });

    test('if todoController has a deleteTodo function', () => {
        expect(typeof todoController.deleteTodo).toBe('function');
    });

    test('if deleteTodo calls TodoModel.findByIdAndDelete', () => {
        todoController.deleteTodo(req, res);

        expect(TodoModel.findByIdAndDelete).toBeCalledWith(todoId);
    });

    test('if the server returns status code 200 and the JSON body in the response', async () => {
        TodoModel.findByIdAndDelete.mockReturnValue(newTodo);

        await todoController.deleteTodo(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    test('if the server returns an error when an invalid request is being made', async () => {
        const errorMessage = { message: 'Could not find a todo with that ID' };
        const rejectedPromise = Promise.reject(errorMessage);

        TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await todoController.deleteTodo(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
});
