import React, { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => (
  <>
    <header></header>
    <main>{children}</main>
    <footer></footer>
  </>
);

export default Layout;
