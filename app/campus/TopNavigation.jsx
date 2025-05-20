"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonField from "../common/ButtonField";
import "./dashboard.css";
import { usePathname, useRouter } from "next/navigation";
import ReExt from "@sencha/reext";
import { useGlobalContext } from "../context/GlobalContext";
import { useMediaQuery } from "../common/hook";
import moment from "moment-timezone";
import TimeDropDown from "../common/TimeDropDown";
import UIToggle from "../common/UIToggle";
import { username } from "../common/CommonDiv";
import Image from "next/image";

function TopNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { setMobileMenu, theme } = useGlobalContext();
  const [active, setActive] = useState("Dashboard");
  const isDesktop = useMediaQuery("(min-width: 1060px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");
  const isMobile = useMediaQuery("(max-width: 599px)");

  useEffect(() => {
    const pathToActiveMap = {
      "/campus/dashboard": "Dashboard",
      "/campus/university": "University",
      "/campus/students": "Students",
      "/campus/profile": "Profile",
      "/campus/referral": "Referral",
      "/campus/realtimeusers": "Active Users",
    };
    setActive(pathToActiveMap[pathname] || "Dashboard");
  }, [pathname]);

  const descriptions = {
    Dashboard: "Welcome back, let's check your stats today",
    University: "Explore and manage university.",
    Students: "You can view and manage all students.",
    Profile: "Manage your account settings.",
    Referral: "Track referral progress.",
    "Active Users": "See who’s currently active.",
  };

  function showMobileNav() {
    setMobileMenu((prev) => !prev);
  }
  return (
    <div
      className={`h-16 shrink-0 flex items-center justify-between topnav ${
        theme == "dark" ? "darkmode" : ""
      }`}
    >
      <div className={`flex items-center gap-10 ${isTablet && "w-half"}`}>
        {isMobile && (
          <Image
            alt="sencha-logo-image"
            width={40}
            height={30}
            src="/images/logo.jpg"
            style={{ borderRadius: 4 }}
            priority
          />
        )}
        <div
          className="flex flex-col"
          style={{ whiteSpace: "nowrap", overflow: "auto" }}
        >
          <h1 className={`${isDesktop ? "topTitle" : "topTitle-mb"} cardText`}>
            {active} Overview
          </h1>
          <p
            className={`${isDesktop ? "text-14" : "text-12"} cardText`}
            style={{ marginTop: "4px" }}
          >
            {descriptions[active] || "Select any tab"}
          </p>
        </div>
      </div>
      {isMobile ? (
        <div className="flex items-center justify-end gap-10">
          <ButtonField
            text={""}
            iconCls="x-fa fa-bars"
            handleClick={showMobileNav}
            style={{ borderRadius: "5px", padding: "4px" }}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-end gap-10 ${
            isTablet && "w-half overflow-x-auto"
          }`}
        >
           {isDesktop && <TimeDropDown />}
          <div className="avatar relative ">
            <ButtonField
              text=""
              iconCls="x-fa fa-bell"
              style={{
                borderRadius: "95px !important",
                backgroundColor: "#F3F4F6",
                // color:"black"
                border: 0,
              }}
              handleClick={() => alert("No alert message")}
            />
            <p className="red-dot" />
          </div>
          <UIToggle /> 

          <div className="profile-container">
            <div
              className="avatar"
              onClick={() => router.push("/campus/profile")}
            >
              {username.slice(0, 2)}
            </div>

            <div className="profile-text ml-10">
              <span className="name cardText">{username}</span>
              <span className="role cardText">Admin</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopNavigation;
