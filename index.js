const express = require('express');
const middleware = require('./middlewares');
const routes = require('./routes');

const app = express();

// app.use('/', middleware.testMiddleware, routes)

app.get('/', (req, res) => {
    res.send('hello');
})

app.listen(process.env.PORT || 5000, () => {
    console.log('server running');
})