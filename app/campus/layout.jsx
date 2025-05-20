"use client";
import React from "react";
import TopNavigation from "./TopNavigation";
import SideNavBar from "./SideNavBar";

function layout({ children }) {
  return (
    <div className="h-screen w-full flex">
      {/* <SideNav className="h-full w-64 shrink-0" /> */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        <TopNavigation />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-200">{children}</div>
      </div>
    </div>
  );
}

export default layout;
