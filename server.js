const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const router = require('./routes/auth.routes');
const todoList = require('./routes/todoList.routes');
const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', router);
app.use('/api/todoList', todoList);

const PORT = config.get('port') || 3000;

const start = async() => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`server listen port: ${PORT}`);
        });
    } catch (error) {
        console.log(`server error: ${error.message}`);
        process.exit(1);
    }
}

start();