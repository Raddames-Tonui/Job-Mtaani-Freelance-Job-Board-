import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import AdminNavbar from "./admin/AdminNavbar";

function LayoutAdmin() {
  return (
    <div className=" overflow-y-scroll no-scrollbar">
      <AdminNavbar  />
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
     <AdminSidebar className="mt-[10vh]"/>

      <div className="bg-blue-50 mt-[10vh] min-h-[90vh] md:ml-[20vw]"> 
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutAdmin;
