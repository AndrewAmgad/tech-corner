require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// initialize express app
const app = express();

// AWS Setup
require('./aws-setup').setup;

// initialize mongoose
require('./mongoose');

// configure body & cookie parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors
app.use(
    cors({
        origin: true,
        credentials: true
    })
);

// import routers
const userRouter = require('../components/user/router');
const itemRouter = require('../components/item/router');
const categoryRouter = require('../components/category/router');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/categories', categoryRouter);

module.exports = app