import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import "../app.css";

function LayoutAuthentication() {
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
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

export default LayoutAuthentication;
