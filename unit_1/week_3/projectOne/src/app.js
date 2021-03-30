const url = require('url');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const companyRouter = require('./routes/companyRoutes');

const app = express();

// middleware
app.use(morgan('dev'));

app.use(express.json());
// app.use(morgan('dev'))
//
//

//
//

app.use('/api/v1/companies', companyRouter);

module.exports = app;
