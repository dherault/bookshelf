const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const data = require('./data');

/* Welcome to the back-end! */

const server = express()
.use(cors())
.use(bodyParser.json())
.get('/books', (req, res) => res.send(data))
.get('/download/:fileName', (req, res) => res.download(path.join(__dirname, './books/', req.params.fileName)))
.listen(3001, err => console.log(err || 'API server listening on port 3001\n'));

process.on('SIGINT', () => {
  console.log('Terminating API server');
  server.close();
  process.exit();
});
