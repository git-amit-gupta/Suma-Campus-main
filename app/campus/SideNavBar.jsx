"use client";
import React, { act, Fragment, useEffect, useRef, useState } from "react";
import ButtonField from "../common/ButtonField";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";
import { useClickOutside, useMediaQuery } from "../common/hook";
import "./index.css";
import DeleteModal from "../common/DeleteModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "../common/Toast";
import ReExt from "@sencha/reext";
import Image from "next/image";
import { NavButton } from "../common/NavButton";
import { username } from "../common/CommonDiv";
import moment from "moment-timezone";
import TimeInfo from "./dashboard/TimeInfo";
import UIToggle from "../common/UIToggle";
import TimeDropDown from "../common/TimeDropDown";

function SideNavBar() {
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const isDesktop = useMediaQuery("(min-width: 960px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");
  const isMobile = useMediaQuery("(max-width: 599px)");

  const { mobileMenu, setMobileMenu, theme } = useGlobalContext();

  useClickOutside(ref, () => setMobileMenu(false), mobileMenu);


  async function handleSignout() {
    // sign out logic here
    try {
      let userId = localStorage.getItem("userId");
      await updateDoc(doc(db, "login", userId), { active: false });
      ToastGreen("Successfully signed out");
      localStorage.removeItem("userId");
    } catch (err) {
      // console.error("Error signing out", err);
      ToastRed("Error signing out", "Anyway I'm signing out");
    } finally {
      router.push("/login");
    }
  }
  
  function showMobileNav() {
    setMobileMenu((prev) => !prev);
  }

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);
  return (
    <Fragment>
      {isDesktop && (
        <div
          className={` ${
            theme == "dark" ? "darkmode" : ""
          } h-full flex flex-col justify-between relative overflow-y-auto sideNavDesktop`}
          style={{ minWidth: "220px" }}
        >
          <div className="flex flex-col  gap-10">
            <div className="flex items-center justify-center w-full mt-10 mr-10">
              <Image
                alt="sencha-logo-image"
                width={130}
                height={50}
                src="/images/Suma_Campus_logo.jpg"
                style={{ borderRadius: 4 }}
              />
            </div>
            <div style={{ marginLeft: 20 }}>
              <p
                className="text-12 fontspace"
                style={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--other1-color)",
                }}
              >
                Main Menu
              </p>
            </div>

            <NavButton
              text="Dashboard"
              icon="x-fa fa-home"
              active={currentPath.includes("/campus/dashboard")}
              onClick={() => router.push("/campus/dashboard")}
            />
            <NavButton
              text="University"
              icon="x-fa fa-university"
              active={currentPath.includes("/campus/university")}
              onClick={() => router.push("/campus/university")}
            />
            <NavButton
              text="Students"
              icon="x-fa fa-graduation-cap"
              active={currentPath.includes("/campus/students")}
              onClick={() => router.push("/campus/students")}
            />
            <NavButton
              text="Referral"
              icon="x-fa fa-users"
              active={currentPath.includes("/campus/referral")}
              onClick={() => router.push("/campus/referral")}
            />
            <NavButton
              text="Active Users"
              icon="x-fa fa-rss"
              active={currentPath.includes("/campus/realtimeusers")}
              onClick={() => router.push("/campus/realtimeusers")}
            />
            <NavButton
              text="Profile"
              icon="x-fa fa-user-circle"
              active={currentPath.includes("/campus/profile")}
              onClick={() => router.push("/campus/profile")}
            />
            <NavButton
              text="Sign Out"
              icon="x-fa fa-hashtag"
              active={false}
              onClick={() => setModalVisible(true)}
            />
          </div>
          <div className="m-10">
            <TimeInfo />
          </div>
        </div>
      )}
      {isTablet && (
        <div
          className={` ${
            theme == "dark" ? "darkmode" : ""
          } h-full flex flex-col justify-between relative overflow-y-auto sideNavDesktop`}
        >
          <div className="flex flex-col  gap-10">
            <div className="flex items-center justify-center w-full mt-10 mr-10">
              <Image
                alt="sencha-logo-image"
                width={55}
                height={30}
                src="/images/Suma_Campus_logo.jpg"
                style={{ borderRadius: 4 }}
                priority
              />
            </div>
            <div style={{ marginLeft: 20 }}>
              <p
                className="text-12 fontspace"
                style={{
                  fontSize: "8px",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  color: "var(--other1-color)",
                }}
              >
                Main Menu
              </p>
            </div>
            <NavButton
              text=""
              icon="x-fa fa-home"
              active={currentPath.includes("/campus/dashboard")}
              onClick={() => router.push("/campus/dashboard")}
            />
            <NavButton
              text=""
              icon="x-fa fa-university"
              active={currentPath.includes("/campus/university")}
              onClick={() => router.push("/campus/university")}
            />
            <NavButton
              text=""
              icon="x-fa fa-graduation-cap"
              active={currentPath.includes("/campus/students")}
              onClick={() => router.push("/campus/students")}
            />
            <NavButton
              text=""
              icon="x-fa fa-users"
              active={currentPath.includes("/campus/referral")}
              onClick={() => router.push("/campus/referral")}
            />
            <NavButton
              text=""
              icon="x-fa fa-rss"
              active={currentPath.includes("/campus/realtimeusers")}
              onClick={() => router.push("/campus/realtimeusers")}
            />
            <NavButton
              text=""
              icon="x-fa fa-user-circle"
              active={currentPath.includes("/campus/profile")}
              onClick={() => router.push("/campus/profile")}
            />
            <NavButton
              text=""
              icon="x-fa fa-hashtag"
              active={false}
              onClick={() => setModalVisible(true)}
            />
          </div>
        </div>
      )}
      {isMobile && (
        <Fragment>
          {mobileMenu && (
            <div
              ref={ref}
              className={`${
                theme == "dark" ? "darkmode" : ""
              } mobile-nav-body sideNavDesktop`}
            >
              <div className="w-full h-full flex flex-col justify-between relative">
                <div className="w-full flex flex-col">
                  <div className="profile-container">
                    <div className="flex items-center">
                      <div
                        // className="avatar-mb"
                        className="avatar"
                        onClick={() => router.push("/campus/profile")}
                      >
                        {username.slice(0, 2)}
                      </div>

                      <div className="profile-text ml-10">
                        <span className="name-mb cardText">{username}</span>
                        <span className="role-mb cardText">Admin</span>
                      </div>
                    </div>

                    <UIToggle radius={false} />
                  </div>

                  <div className="flex flex-col m-10 overflow-y-auto">
                    <NavButton
                      text="Dashboard"
                      icon="x-fa fa-home"
                      active={currentPath.includes("/campus/dashboard")}
                      onClick={() => router.push("/campus/dashboard")}
                    />
                    <NavButton
                      text="University"
                      icon="x-fa fa-university"
                      active={currentPath.includes("/campus/university")}
                      onClick={() => router.push("/campus/university")}
                    />
                    <NavButton
                      text="Students"
                      icon="x-fa fa-graduation-cap"
                      active={currentPath.includes("/campus/students")}
                      onClick={() => router.push("/campus/students")}
                    />
                    <NavButton
                      text="Referral"
                      icon="x-fa fa-users"
                      active={currentPath.includes("/campus/referral")}
                      onClick={() => router.push("/campus/referral")}
                    />
                    <NavButton
                      text="Active Users"
                      icon="x-fa fa-rss"
                      active={currentPath.includes("/campus/realtimeusers")}
                      onClick={() => router.push("/campus/realtimeusers")}
                    />
                    <NavButton
                      text="Profile"
                      icon="x-fa fa-user-circle"
                      active={currentPath.includes("/campus/profile")}
                      onClick={() => router.push("/campus/profile")}
                    />
                    <NavButton
                      text="Sign Out"
                      icon="x-fa fa-hashtag"
                      active={false}
                      onClick={() => setModalVisible(true)}
                    />
                  </div>
                </div>
                <div className="flex flex-col m-10 gap-5">
                  <TimeDropDown />

                  <TimeInfo />
                  {/* <NavButton
                    text="Close"
                    icon="x-fa fa-times"
                    active={false}
                    onClick={showMobileNav}
                  /> */}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
      {modalVisible && (
        <DeleteModal
          deleteName={"Signout"}
          handleClose={() => setModalVisible(false)}
          handleDelete={handleSignout}
        />
      )}
    </Fragment>
  );
}

export default SideNavBar;
