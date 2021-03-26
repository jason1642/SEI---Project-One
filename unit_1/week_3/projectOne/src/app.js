const url = require('url');
const express = require('express');

const companyRouter = require('./routes/companyRoutes');

const app = express();

// middleware
app.use(express.json());
// app.use(morgan('dev'))
//
//

//
//

app.use('/api/v1/companies', companyRouter);

module.exports = app;
