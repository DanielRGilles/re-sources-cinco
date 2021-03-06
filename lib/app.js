const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/reptiles', require('./controllers/reptiles'));
app.use('/api/v1/mammals', require('./controllers/mammals'));
app.use('/api/v1/amphibians', require('./controllers/amphibians'));
app.use('/api/v1/birds', require('./controllers/birds'));
app.use('/api/v1/plants', require('./controllers/plants'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
