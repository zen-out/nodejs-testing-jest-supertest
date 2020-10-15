const app = require('../../app');
const request = require('supertest');

const newTodo = require('../mocks/newTodo.json');


const endpointUrl = '/todos';


test('POST' + endpointUrl, async () => {
    jest.setTimeout(15000);

    const response = await request(app)
        .post(endpointUrl)
        .send(newTodo);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
});