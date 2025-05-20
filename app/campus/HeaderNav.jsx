import ReExt from "@sencha/reext";
import Image from "next/image";
import React from "react";
import ReusableDisplayField from "../common/DisplayField";
import UIToggle from "../common/UIToggle";
import moment from "moment-timezone";
import TimeZone from "../common/TimeZone";
import ButtonField from "../common/ButtonField";
import { useGlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "../common/hook";
import "../campus/dashboard/dashboard.css";
import { MainIcon } from "../common/icons";

function HeaderNav() {
  const { mobileMenu, setMobileMenu, globalTime, theme } = useGlobalContext();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 960px)");

  function showMobileNav() {
    setMobileMenu((prev) => !prev);
  }

  return (
    <div
      className="flex h-full w-full items-center justify-between"
      style={{ margin: "0 5px" }}
    >
      <div
        className="flex flex-row items-center w-half gap-10"
        style={{ height: "36px" }}
      >
        
        <MainIcon color={theme === "dark" ? "white" : "black"} />
        <p
          // className="subtitle"
          style={{
            fontSize: "20px",
            fontWeight: 600,
            fontStyle: "normal",
            lineHeight: "14px",
            fontFamily: "cursive",
          }}
        >
          Suma Campus
        </p>
      </div>
      {isDesktop ? (
        <div className="flex flex-row items-center justify-end w-half gap-10">
          {/* <ReusableDisplayField value={globalTime} /> */}
          <p className="smalltext">{globalTime}</p>
          <UIToggle />
          <ReExt
            xtype="button"
            style={{ width: 150 }}
            config={{
              text: "Profile",
              iconCls: "x-fa fa-user-circle",
              margin: "10 10 10 10",
              enableToggle: true,
              size: "small",
              style: { borderRadius: "5px" },
            }}
            onClick={() => router.push("/campus/profile")}
          />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-end w-half gap-10">
          {/* <ReusableDisplayField value={globalTime} /> */}
          <p className="smalltext">{globalTime}</p>

          <UIToggle />

          <ButtonField
            text={""}
            iconCls="x-fa fa-bars"
            handleClick={showMobileNav}
            style={{ borderRadius: "5px", padding: "4px" }}
          />
        </div>
      )}
    </div>
  );
}

export default HeaderNav;


