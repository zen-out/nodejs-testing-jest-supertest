const express = require('express');
require('dotenv').config();

const connectDatabase = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');

connectDatabase();
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/todos', todoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});


module.exports = app;