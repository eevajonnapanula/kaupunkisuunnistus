import React, { FunctionComponent } from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
}

const SEO: FunctionComponent<SEOProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export default SEO;
