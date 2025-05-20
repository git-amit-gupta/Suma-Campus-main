"use client";
import ReExt from "@sencha/reext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../login/login.css";
import { useRouter } from "next/navigation";
import { ToastGreen, ToastRed } from "../common/Toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useMediaQuery } from "../common/hook";
function page() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const loginStyle = {
    height: "100vh",
    display: "flex",
    flex: 1,
  };
  async function handleSubmit() {
    const form = Ext.getCmp("formLogin"); // Get the form by its ID
    try {
      if (form) {
        const formValues = form.getForm().getValues(); // Retrieve form values
        let loginObj = {
          ...formValues,
          createdAt: Date.now(),
          active: false,
        };
        await addDoc(collection(db, "login"), loginObj);
        ToastGreen("Successfully Signed Up 👍👍");
        router.push("/login");
      } else {
        
        ToastRed();
      }
    } catch (error) {
      ToastRed();
    }
  }
  return (
    <div className="flex flex-col items-center relative" style={loginStyle}>
      <Image
        alt="login"
        src={"/images/login5.svg"}
        fill
        className="flip-horizontal"
      />
      <div
        style={{ margin: "20px 0", gap: "10px" }}
        className="flex flex-col items-center z-10"
      >
        <h1 className={isDesktop ? "register-title" : "register-title_mb"}>
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

                items: [
                  {
                    xtype: "form",
                    id: "formLogin",
                    height: 414,
                    width: 340,
                    reference: "formLogin",
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
                        html: "Register Your Account",
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
                      },

                      {
                        xtype: "button",
                        text: "Register",
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
                          "background-color": "#3A86FF",
                          "border-radius": "16px !important",
                        },
                        overCls: "btn-hover-class",
                      },
                    ],
                  },
                  {
                    xtype: "button",
                    margin: "4 0 0 0",
                    width: 280,
                    style: {
                      "font-size": "16px",
                      "text-align": "center",
                      color: "var(--base-foreground-color)",
                      "letter-spacing": "1.25px",
                      "background-color": "#3A86FF",
                    },
                    cls:"btn",
                    overCls: "btn-hover-class",
                    html:
                      `<span class="signup">Have an account?</span>` + ` Login`,
                    handler: () => {
                      router.push("/login");
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
              bodyPadding: 30,

              items: [
                {
                  xtype: "form",
                  id: "formLogin",
                  height: 414,
                  // width: "100%",
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
                      html: "Register Your Account",
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
                        margin: "20px 0",
                      },
                      responsiveConfig: {
                        desktop: {
                          errorTarget: "side",
                        },
                      },
                    },

                    {
                      xtype: "button",
                      text: "Register",
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
                        "background-color": "#3A86FF",
                        "border-radius": "16px !important",
                      },
                      overCls: "btn-hover-class",
                    },
                  ],
                },
                {
                  xtype: "button",
                  margin: "4 10 0 10",
                  width: 220,
                  style: {
                    "font-size": "16px",
                    "text-align": "center",
                    color: "var(--base-foreground-color)",
                    "letter-spacing": "1.25px",
                    "background-color": "#3A86FF",
                  },
                  cls:"btn",
                  overCls: "btn-hover-class",
                  html:
                    `<span class="signup">Have an account?</span>` + ` Login `,
                  handler: () => {
                    router.push("/login");
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
