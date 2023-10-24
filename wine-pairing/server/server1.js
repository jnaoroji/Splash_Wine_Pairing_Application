const { ApolloServer } = require ('@apollo/server');
const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const { expressMiddleware } = require ('@apollo/server/express4');
// const { ApolloServerPluginDrainHttpServer } = require ('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } = require ('@apollo/server/plugin/landingPage/default');

// const http = require ('http');
const cors = require ('cors');
const pkg = require ('body-parser');
const { json } = pkg;






const PORT = process.env.PORT || 3001;
const app = express();
// const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    // ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: 'my-graph-id@my-graph-variant',
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
  

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: authMiddleware,
      // context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
  // server.expressMiddleware({ app });
  // server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
