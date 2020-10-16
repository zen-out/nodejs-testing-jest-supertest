const app = require('../../app');
const request = require('supertest');

const newTodo = require('../mocks/newTodo.json');


const endpointUrl = '/todos';
let firstTodo;


describe(`GET${endpointUrl}`, () => {
    jest.setTimeout(15000);

    test('GET' + endpointUrl, async () => {
        const response = await request(app)
            .get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();

        firstTodo = response.body[0];
    });

    test(`GET${endpointUrl}:todoId`, async () => {
        const response = await request(app)
            .get(`${endpointUrl}/${firstTodo._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(firstTodo._id);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });

    test(`POST${endpointUrl}`, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    test(`PUT${endpointUrl}:todoId`, async () => {
        const response = await request(app)
            .put(`${endpointUrl}/${firstTodo._id}`)
            .send(newTodo);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    test(`DELETE${endpointUrl}:todoId`, async () => {
        const response = await request(app)
            .delete(`${endpointUrl}/${firstTodo._id}`);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });
});

