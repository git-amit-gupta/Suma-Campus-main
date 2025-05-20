"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import ReExt from "@sencha/reext";
import React from "react";

function page() {
  const { theme } = useGlobalContext();
  return (
    <div className={theme == "dark" ? "darkmode h-full" : "h-full"}>
      <ReExt
        xtype="panel"
        style={{ width: "100%", height: "100%" }}
        config={{
          flex: 1,
          bodyPadding: 10,
          // frame: true,
          title: "Profile",
          scrollable: {
            x: false, // Disable horizontal scroll
            y: true, // Enable vertical scroll
          },
          layout: { type: "vbox", align: "center", pack: "center" },
          // cls: theme === "dark" ? "darkmode" : "",

          items: [
            {
              xtype: "image",
              height: 90,
              width: 280,
              alt: "admin-image",
              src: "/images/user_profile_color.svg",
            },
            {
              xtype: "component",
              html: `<h3 class="cardText">Contact Manager for further Information.</h3>`,
              style: {
                padding: "10px",
              },
            },
            {
              xtype: "displayfield",
              allowBlank: false,
              required: true,
              width: 180,
              fieldLabel: "Username",
              name: "username",
              value: localStorage.getItem("username") || "Unavailable",
              style: {
                margin: "20px 0 20px 0",
              },
              responsiveConfig: {
                desktop: {
                  errorTarget: "side",
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}

export default page;
