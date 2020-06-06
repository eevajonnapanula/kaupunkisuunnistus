import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";

const client = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
