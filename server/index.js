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
.use(express.static(path.join(__dirname, '../front/build')))
.listen(5000, err => console.log(err || 'API server listening on port 5000\n'));

process.on('SIGINT', () => {
  console.log('Terminating API server');
  server.close();
  process.exit();
});
