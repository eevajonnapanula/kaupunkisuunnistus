import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
import "../index.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Layout from "../components/Layout";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default MyApp;
