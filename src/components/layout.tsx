import React, { FC } from "react";
import PropTypes from "prop-types";

import "./layout.css";
import "./main.css";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="main-wrapper">
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
