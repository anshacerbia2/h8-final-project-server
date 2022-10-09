const { ApolloServer } = require("apollo-server");

// const server = new ApolloServer({
//   typeDefs: [user.typeDefs, movie.typeDefs],
//   resolvers: [user.resolvers, movie.resolvers],
//   introspection: true,
//   playground: true
// });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`Server Running at `, url);
});