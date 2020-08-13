require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require("helmet")
const path = require('path')

// initialize express app
const app = express();


// AWS Setup
require('./aws-setup').setup;

// initialize mongoose
require('./mongoose');

// configure body & cookie parser
app.use(express.static(path.join(__dirname, 'build')))
app.use(helmet());
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
const locationRouter = require('../components/location/router');



app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/location', locationRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })

module.exports = app