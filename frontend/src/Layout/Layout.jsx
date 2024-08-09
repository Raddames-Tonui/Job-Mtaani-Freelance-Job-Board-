import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import NavbarHome from "../home/NavbarHome";

import "../app.css";

function Layout() {
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <NavbarHome />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          className: "toast-below-navbar",
          style: {
            zIndex: 100,
          },
        }}
      />

      <div className="bg-blue-50 min-h-[90vh] ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
