const graphqlHTTP = require('express-graphql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const schema = require('./schema');

/* Welcome to the back-end! */

const isDevelopment = process.env.NODE_ENV !== 'production';
const formatError = error => console.error(error) || error;

const server = express()
.use(cors())
.use(bodyParser.json())
.use('/graphql', (req, res) => {

  /* Log query */

  if (req.body && req.body.query) {
    console.log('\n__________\nNew query:\n', req.body.query);

    if (req.body.variables && Object.keys(req.body.variables).length) {
      console.log('\nVariables:\n', JSON.stringify(req.body.variables, null, 2));
    }
  }
  else {
    console.log('body:', req.body);
  }

  /* Execute query */

  graphqlHTTP({
    schema,
    pretty: isDevelopment,
    graphiql: isDevelopment,
    formatError,
  })(req, res);
})
.listen(3001, err => console.log(err || 'GraphQL endpoint listening on port 3001\n'));

process.on('SIGINT', () => {
  console.log('Terminating GraphQL service.');
  server.close();
  process.exit();
});
