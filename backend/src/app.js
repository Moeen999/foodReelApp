//! create the server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth.routes.js');
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/auth', authRoutes);

module.exports = app;