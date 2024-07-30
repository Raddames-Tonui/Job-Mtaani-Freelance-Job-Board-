import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <Navbar />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            zIndex: 100,
            top: '10vh',
          },
        }}
      />
      <div className="bg-gray-100 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
