import { ApolloProvider } from "@apollo/react-hooks";
import client from "../lib/apollo";
import "../index.css";
import { NextPage } from "next";
import { AppProps } from "next/app";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
