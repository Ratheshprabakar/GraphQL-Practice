const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema');

const app = express();

app. use('/graphql-demo', graphqlHTTP({
    schema: schema,
    graphiql : true
}))

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});