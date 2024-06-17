import React from "react";
import SideNavBar from "./_components/SideNavBar";
import Header from "./_components/Header";

function layout({ children }) {
  return (
    <div className="relative">
      <div className="sm:w-64 sm:block sm:fixed sm:top-0 sm:left-0 hidden">
        <SideNavBar />
      </div>
      <div className="ml-0 sm:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;
