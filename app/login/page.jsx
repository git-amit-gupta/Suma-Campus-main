"use client";
import ReExt from "@sencha/reext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReusableDisplayField from "../common/DisplayField";
import "./login.css";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "../common/hook";
import { ToastGreen, ToastRed } from "../common/Toast";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
function page() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const loginStyle = {
    height: "100vh",
    display: "flex",
    flex: 1,
  };
  async function handleSubmit() {
    const form = Ext.getCmp("formLogin"); // Get the form by ID

    try {
      // Retrieve form values
      const { username, password } = form.getForm().getValues();

      // Query Firestore for matching username and password
      const q = query(
        collection(db, "login"),
        where("username", "==", username || "admin1"),
        where("password", "==", password || "admin1")
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        ToastRed("Invalid credentials.", "No matching documents found.");
        return;
      }

      // Retrieve the first matching document
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;

      // Update the `active` field to true
      await updateDoc(doc(db, "login", userId), { active: true });

      // Store user details in localStorage
      localStorage.setItem("userId", userId || "Li5WEmzg6p0sNSYlmeeh");
      localStorage.setItem("username", username || "admin1");

      ToastGreen("Successfully logged in 🥳🥳");
      router.push("/campus/dashboard");
    } catch (error) {
      ToastRed("An error occurred during login.");
    }
  }

  return (
    <div className="flex flex-col items-center relative " style={loginStyle}>
      <Image
        alt="login"
        src={"/images/login3.svg"}
        fill
        className="flip-horizontal"
      />

      <div
        style={{ margin: "20px 0", gap: "10px" }}
        className="flex flex-col items-center z-10"
      >
        <h1 className={isDesktop ? "login-title" : "login-title_mb"}>
          WELCOME TO SUMA CAMPUS
        </h1>
        <h4 className={isDesktop ? "login-subtitle" : "login-subtitle_mb"}>
          YOUR STUDY ABROAD PARTNER
        </h4>
      </div>

      {isDesktop ? (
        <div
          className="flex flex-row items-center justify-between w-full"
          style={{ gap: "20px", marginRight: "130px" }}
        >
          <div>
            <ReExt
              xtype="image"
              config={{
                width: 750,
                height: 400,
                src: "/images/LoginImage.svg",
              }}
            />
          </div>
          <div>
            <ReExt
              xtype="container"
              config={{
                height: 484,
                width: 340,
                bodyPadding: 30,
                    
                style: { "box-shadow": "0 8px 24px rgba(0, 0, 0, 0.08)"},

                items: [
                  {
                    xtype: "form",
                    id: "formLogin",
                    height: 414,
                    width: 340,
                    // reference: "formLogin",
                    layout: {
                      type: "vbox",
                      align: "middle",
                    },
                    style: {
                      "background-color": "#fff",
                      "box-shadow": "0 8px 24px rgba(0, 0, 0, 0.08)",
                      "border-radius":"4px"
                    },
                    bodyPadding: 30,
                    items: [
                      {
                        xtype: "image",
                        height: 90,
                        width: 200,
                        alt: "sencha-logo-image",
                        src: "/images/Suma_Campus_logo.jpg",
                      },
                      {
                        xtype: "component",
                        width: 280,
                        height: 27,
                        html: "Log In to Your Account",
                        style: {
                          "font-size": "24px",
                          "text-align": "center",
                          margin: "20px 0 20px 0",
                          "font-weight": "600",
                        },
                      },

                      {
                        xtype: "textfield",
                        allowBlank: false,
                        required: true,
                        width: 280,
                        fieldLabel: "Username",
                        name: "username",
                        placeholder: "User Name",
                        errorTarget: "qtip",
                        style: {
                          margin: "20px 0 20px 0",
                          "font-size": "16px",
                          "font-weight": "400",
                        },
                        responsiveConfig: {
                          desktop: {
                            errorTarget: "side",
                          },
                        },
                        value: 'admin1',
                        readOnly:'true',
                      },
                      {
                        xtype: "textfield",
                        allowBlank: false,
                        required: true,
                        width: 280,
                        fieldLabel: "Password",
                        name: "password",
                        placeholder: "password",
                        errorTarget: "qtip",
                        style: {
                          margin: "20px 0",
                        },
                        responsiveConfig: {
                          desktop: {
                            errorTarget: "side",
                          },
                        },
                        value: 'admin1',
                        readOnly:'true'
                      },

                      {
                        xtype: "button",
                        text: "LOGIN",
                        autoSize: true,
                        handler: () => {
                          handleSubmit();
                        },
                        width: 280,
                        style: {
                          "text-align": "center",
                          "letter-spacing": "0.2px",
                          "font-size": "14px",
                          margin: "auto",
                          "font-weight": "600",
                          "background-color": "#00B4D8",
                          "border-radius": "16px !important",
                        },
                        overCls: "loginbtn-hover-class",
                      },
                      
                    ],
                  },
                  {
              xtype: "component",
              html: `<p class="flex justify-center">username: admin1 - password: admin1</p>`,
            },
                  {
                    xtype: "button",
                    margin: "4 0 0 0",
                    width: 280,
                    cls: "custom-button btn",
                    overCls: "loginbtn-hover-class",
                    html:
                      "Don’t have an account?" +
                      `<span class="signup"> Sign-Up</span>`,
                    handler: () => {
                      router.push("/register");
                    },
                  },
                ],
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center w-full h-full">
          <ReExt
            xtype="container"
            style={{ margin: "0 10px 0 10px" }}
            config={{
              height: 484,
              width: "100%",
              bodyPadding: 10,

              items: [
                {
                  xtype: "form",
                  height: 414,
                  // width: 340,
                  id: "formLogin",
                  layout: {
                    type: "vbox",
                    align: "middle",
                  },
                  style: {
                    "background-color": "#fff",
                    "box-shadow": "0 8px 24px rgba(0, 0, 0, 0.08)",
                    "border-radius":"4px"

                  },
                  bodyPadding: 10,
                  items: [
                    {
                      xtype: "image",
                      height: 90,
                      width: 200,
                      alt: "sencha-logo-image",
                      src: "/images/Suma_Campus_logo.jpg",
                    },
                    {
                      xtype: "component",
                      width: 280,
                      height: 27,
                      html: "Login Into Your Account",
                      style: {
                        "font-size": "20px",
                        "text-align": "center",
                        margin: "20px 0 20px 0",
                        "font-weight": "600",

                      },
                    },

                    {
                      xtype: "textfield",
                      allowBlank: false,
                      required: true,
                      width: 240,
                      fieldLabel: "Username",
                      name: "username",
                      placeholder: "User Name",
                      errorTarget: "qtip",
                      style: {
                        margin: "20px 0",
                        "font-size": "16px",
                        "font-weight": "400",
                      },
                      responsiveConfig: {
                        desktop: {
                          errorTarget: "side",
                        },
                      },
                    },
                    {
                      xtype: "textfield",
                      allowBlank: false,
                      required: true,
                      width: 240,
                      fieldLabel: "Password",
                      name: "password",
                      placeholder: "password",
                      errorTarget: "qtip",
                      style: {
                        margin: "20px",
                      },
                      responsiveConfig: {
                        desktop: {
                          errorTarget: "side",
                        },
                      },
                    },

                    {
                      xtype: "button",
                      text: "LOGIN",
                      autoSize: true,
                      handler: () => {
                        handleSubmit();
                      },
                      width: 240,
                      style: {
                        "text-align": "center",
                        "letter-spacing": "0.2px",
                        "font-size": "14px",
                        margin: "auto",
                        "font-weight": "600",
                        "background-color": "#00B4D8",
                        "border-radius": "16px !important",
                      },
                      overCls: "loginbtn-hover-class",
                    },
                  ],
                },
                 {
              xtype: "component",
              html: `<p class="flex justify-center">username: admin1 - password: admin1</p>`,
            },
                {
                  xtype: "button",
                  margin: "4 10 0 10",
                  width: 220,
                  cls: "custom-button btn",
                  overCls: "loginbtn-hover-class",
                  html:
                    "Don’t have an account?" +
                    `<span class="signup"> Sign-Up </span>`,
                  handler: () => {
                    router.push("/register");
                  },
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default page;
