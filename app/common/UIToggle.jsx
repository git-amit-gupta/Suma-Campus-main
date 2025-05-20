"use client";
import ReExt from "@sencha/reext";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import "./common.css";
import ButtonField from "./ButtonField";

function UIToggle({radius=true}) {
  const { theme, switchTheme } = useGlobalContext();

  return (
    <div className="UIToggle">

      {theme == "dark" ? (
        <ButtonField
          iconCls="x-fa fa-moon"
          text=""
          handleClick={() => switchTheme()}
          style={{
            borderRadius: radius ? "95px !important" :"",
            padding: "4px",
            // height: "40px",
            // width: "40px",
          }}
        />
      ) : (
        <ButtonField
          iconCls="x-fa fa-sun"
          text=""
          handleClick={() => switchTheme()}
          style={{
            borderRadius: radius ? "95px !important" :"",
            padding: "4px",
            // height: "40px",
            // width: "40px",
          }}
        />
      )}
    </div>
  );
}

export default UIToggle;
