"use client";
import React, { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import SampleData from "../components/SampleData";
import Dashboard from "./dashboard/page";

function page() {
  const { theme } = useGlobalContext();
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("darkmode");
    } else {
      htmlElement.classList.remove("darkmode");
    }
  }, [theme]);
  return <Dashboard />;
}

export default page;
