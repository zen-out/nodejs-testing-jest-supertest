const httpMocks = require('node-mocks-http');

const todoController = require('./todoController');
const TodoModel = require('../models/todoModel');
const newTodo = require('../test/mocks/newTodo.json');
const allTodos = require('../test/mocks/allTodos.json');


TodoModel.create = jest.fn();
TodoModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
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

    test('if the server returns a 200 response code', () => {
        todoController.createTodo(req, res);

        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    test('if the server returns the json body in the response', async () => {
        TodoModel.create.mockReturnValue(newTodo);

        await todoController.createTodo(req, res);

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

