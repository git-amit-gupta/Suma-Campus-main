import React from "react";
import ReExt from "@sencha/reext";

export const NavButton = ({ text, icon, onClick, active = false }) => {
  const buttonConfig = {
    xtype: "button",
    text: text || "",
    iconCls: icon || "x-fa fa-bars",
    handler: onClick || (() => {}),
    ui: "default-toolbar",
    enableToggle: true, // Enables toggle behavior
    shadow: true,

    style: {
      backgroundColor: "inherit",
      borderRadius: "4px",
    },
  };

  return (
    <div
      // onClick={onClick}
      className={`navbtn ${active ? "activeCls":""}`}
      style={{
        //   margin: "5px 0",
        padding: "12px 16px",
        //   borderRadius: "4px",
        backgroundColor: active ? "#EFF6FF" : "transparent",
        borderLeft: active ? "4px solid rgb(79 156 249)" : "",
        color: "#374151",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        transition: "all 0.3s ease",
        // borderTopRightRadius:"4px",
        // borderBottomRightRadius:"4px"
      }}
    >
      <ReExt xtype="button" config={buttonConfig} />
    </div>
  );
};
