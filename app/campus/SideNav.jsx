import React, { Fragment, useRef, useState } from "react";
import ButtonField from "../common/ButtonField";
import { useRouter } from "next/navigation";

import { useGlobalContext } from "../context/GlobalContext";
import { useClickOutside, useMediaQuery } from "../common/hook";
import "./index.css";
import DeleteModal from "../common/DeleteModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "../common/Toast";
import ReExt from "@sencha/reext";
import Image from "next/image";
function SideNav() {
  const ref = useRef(null);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const { mobileMenu, setMobileMenu } = useGlobalContext();

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
  return (
    <Fragment>
      {isDesktop ? (
        <div
          className="h-full flex flex-col justify-between border relative"
          style={{ minWidth: "220px" }}
        >
          <div className="flex flex-col m-10 gap-10">
            <div className="flex items-center justify-center w-full">
              <Image
                alt="sencha-logo-image"
                width={150}
                height={50}
                src="/images/Suma_Campus_logo.jpg"
              />
            </div>
            <div class="px-4 mb-4">
              <p class="text-xs uppercase font-semibold text-gray-500 mb-2">
                Main Menu
              </p>
            </div>
            <ButtonField
              iconCls="x-fa fa-home"
              text="Dashboard"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => router.push("/campus/dashboard")}
            />
            <ButtonField
              iconCls="x-fa fa-university"
              text="University"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => router.push("/campus/university")}
            />
            <ButtonField
              iconCls="x-fa fa-graduation-cap"
              text="Students"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => router.push("/campus/students")}
            />
            <ButtonField
              iconCls="x-fa fa-users"
              text="Referral"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => router.push("/campus/referral")}
            />
            <ButtonField
              iconCls="x-fa fa-rss"
              text="Active Users"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => router.push("/campus/realtimeusers")}
            />
          </div>
          <div className="flex flex-col m-10 gap-10">
            <ButtonField
              iconCls="x-fa fa-user-circle"
              text="Profile"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => router.push("/campus/profile")}
            />
            <ButtonField
              iconCls="x-fa fa-hashtag"
              text="Sign Out"
              style={{
                backgroundColor: "#00B386",
                borderColor: "#00B386",
                color: "white",
                // border: "none",
              }}
              handleClick={() => setModalVisible(true)}
            />
          </div>
        </div>
      ) : (
        <Fragment>
          {mobileMenu && (
            <div
              ref={ref}
              className="mobile-nav-body"
              style={{ borderLeft: "1px solid white" }}
            >
              <div className="w-full h-full flex flex-col justify-between relative">
                <div className="flex flex-col m-10 gap-10">
                  <ButtonField
                    text={""}
                    iconCls="x-fa fa-times"
                    handleClick={showMobileNav}
                    style={{ backgroundColor: "red", borderColor: "black" }}
                  />
                  <ButtonField
                    iconCls="x-fa fa-check"
                    text="Dashboard"
                    style={{
                      backgroundColor: "#00B386",
                      borderColor: "#00B386",

                      color: "white",
                      // border: "none",
                    }}
                    handleClick={() => router.push("/campus/dashboard")}
                  />
                  <ButtonField
                    iconCls="x-fa fa-check"
                    text="University"
                    style={{
                      backgroundColor: "#00B386",
                      borderColor: "#00B386",

                      color: "white",
                      // border: "none",
                    }}
                    handleClick={() => router.push("/campus/university")}
                  />
                  <ButtonField
                    iconCls="x-fa fa-check"
                    text="Students"
                    style={{
                      backgroundColor: "#00B386",
                      borderColor: "#00B386",

                      color: "white",
                      // border: "none",
                    }}
                    handleClick={() => router.push("/campus/students")}
                  />
                  <ButtonField
                    iconCls="x-fa fa-check"
                    text="Referral"
                    style={{
                      backgroundColor: "#00B386",
                      borderColor: "#00B386",
                      color: "white",
                      // border: "none",
                    }}
                    handleClick={() => router.push("/campus/referral")}
                  />
                  <ButtonField
                    iconCls="x-fa fa-rss"
                    text="Active Users"
                    style={{
                      backgroundColor: "#00B386",
                      borderColor: "#00B386",
                      color: "white",
                    }}
                    handleClick={() => router.push("/campus/realtimeusers")}
                  />
                </div>
                <div className="flex flex-col m-10 gap-10">
                  <ButtonField
                    iconCls="x-fa fa-check"
                    text="Profile"
                    style={{
                      backgroundColor: "#00B386",
                      color: "white",
                      borderColor: "#00B386",
                    }}
                    handleClick={() => router.push("/campus/profile")}
                  />
                  <ButtonField
                    iconCls="x-fa fa-check"
                    text="Sign Out"
                    style={{
                      backgroundColor: "#00B386",
                      color: "white",
                      borderColor: "#00B386",
                    }}
                    handleClick={() => setModalVisible(true)}
                  />
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

export default SideNav;
