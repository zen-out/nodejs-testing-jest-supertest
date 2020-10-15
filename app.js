const express = require('express');
require('dotenv').config();

const connectDatabase = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');

connectDatabase();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Hello world');
});

app.use('/todos', todoRoutes);


module.exports = app;