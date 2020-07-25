import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    headers: {
      "X-Hasura-Role": process.env.NEXT_PUBLIC_HASURA_ROLE,
    },
  }),
});

export default client;
