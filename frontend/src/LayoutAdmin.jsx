import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import AdminNavbar from "./admin/AdminNavbar";

import './app.css';


function LayoutAdmin() {
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <AdminNavbar  />
      <Toaster
            position="top-right"
            reverseOrder={true}
            toastOptions={{
              className: 'toast-below-navbar',
              style: {
                zIndex: 100,
              },
            }}
          />
     <AdminSidebar className="mt-[10vh]"/>

      <div className="bg-blue-50 mt-[10vh] min-h-[90vh] md:ml-[20vw]"> 
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutAdmin;
