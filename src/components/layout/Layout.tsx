import * as React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="app">
      <Outlet />
    </main>
  );
};

export default Layout;
