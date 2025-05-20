"use client";
import ReExt from "@sencha/reext";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ActiveAdmin() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const doAsync = async () => {
      try {
        await import("../../public/custom/ActiveAdminList");
        setReady(true);
      } catch (e) {
        console.error("fail", e);
      }
    };
    doAsync();
  }, []);
  return (
    <>
      {ready ? (
        <ReExt
          xtype="adminlist"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 350,
            borderRadius: 8,
            border: "1px solid #fff",
            overflow: "auto",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          }}
          config={{
            cls: "panelcls",
          }}
        />
      ) : (
        <Skeleton count={3} height={100} />
      )}
    </>
  );
}

export default ActiveAdmin;
