import React, { useEffect, useState, FunctionComponent } from "react";
import { createClient } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";

export const ApolloPersistentProvider: FunctionComponent = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (client) return;
    createClient().then((newClient) => {
      setClient(newClient);
    });
  }, [client]);

  return (
    !!client && <ApolloProvider client={client}>{children}</ApolloProvider>
  );
};
