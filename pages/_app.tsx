import { ApolloProvider } from "@apollo/client";

import "../index.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloPersistentProvider } from "../components/ApolloPersistentProvider";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloPersistentProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloPersistentProvider>
  );
};

export default MyApp;
