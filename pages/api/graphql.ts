import { ApolloServer, gql } from "apollo-server-micro";
import tasks from "../../data/tasks.json";

const typeDefs = gql`
  type Task {
    id: ID
    name: String
    nextTaskClue: String
    description: String
  }

  type Query {
    tasks: [Task]
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
