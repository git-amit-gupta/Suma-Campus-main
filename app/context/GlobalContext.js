// app/context/GlobalContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState("light"); 
  const [mobileMenu,setMobileMenu]= useState(false);
  const [globalTime,setGlobalTime]= useState("");
  function switchTheme() {
    let ui = localStorage.getItem("ui");
    const htmlElement = document.documentElement;

    if (ui == "dark") {
      localStorage.setItem("ui", "light");
      htmlElement.classList.remove('darkmode');
      setTheme("light");
    } else {
      localStorage.setItem("ui", "dark");
      htmlElement.classList.add('darkmode');
      setTheme("dark");
    }
  }
  useEffect(() => {
    // Check and set the theme from localStorage
    const savedTheme = localStorage.getItem("ui") || "light";
    setTheme(savedTheme);
  }, []);
  return (
    <GlobalContext.Provider value={{ theme, switchTheme,mobileMenu,setMobileMenu,globalTime,setGlobalTime }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a SidebarProvider");
  }
  return context;
};
