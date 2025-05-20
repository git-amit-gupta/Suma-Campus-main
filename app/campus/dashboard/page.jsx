"use client";

import React from "react";
import "../dashboard.css";
import { useGlobalContext } from "@/app/context/GlobalContext";
import ActiveAdmin from "@/app/components/ActiveAdmin";
import { useMediaQuery } from "@/app/common/hook";
import BarChart from "@/app/components/Barchart";
import PieChartPage from "@/app/components/PieChartPage";
import Content from "./Content";
function Dashboard() {
  const { theme } = useGlobalContext();
  const isDesktop = useMediaQuery("(min-width: 960px)");

  return (
    <div id="wrapper" className={theme == "dark" ? "darkmode" : ""}>
      {/* <div className="flex-item">
        <TimePanel />
      </div> */}

      <div className="flex-item-header">
        <Content />
      </div>
      {/* <div className="flex-item">
        <TimeZone />
      </div> */}

      {/* <div className="flex-item">
        <NetworkSignalStrength />
      </div> */}

      <div className="flex-item" style={{ width: "96.5%" }}>
        <BarChart />
      </div>

      <div className="flex-item" style={{ minHeight: 400, width: "96.5%" }}>
        {/* {isDesktop ? <PieChart /> : <DataPanel title={"Remaining Seats"}/>} */}
        <PieChartPage />
      </div>

      <div className="flex-item " style={{ minHeight: 400, width: "96.5%" }}>
        <ActiveAdmin />
      </div>
    </div>
  );
}

export default Dashboard;
