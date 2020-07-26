import gql from "graphql-tag";
import { persistCache } from "apollo-cache-persist";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const typeDefs = gql`
  extend type Query {
    currentTeamId: String
    currentTeamName: String
  }
`;

export const createClient = async (): Promise<
  ApolloClient<NormalizedCacheObject>
> => {
  const cache = new InMemoryCache();

  await persistCache({
    cache,
    storage: window.localStorage,
  });

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
      headers: {
        "X-Hasura-Role": process.env.NEXT_PUBLIC_HASURA_ROLE,
      },
    }),
    cache,
    typeDefs,
  });
};
