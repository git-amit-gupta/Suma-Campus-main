"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { db } from "@/firebase/firebaseConfig";
import ReExt from "@sencha/reext";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const RealtimeChart = () => {
  const { theme } = useGlobalContext();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const doAsync = async () => {
      try {
        await import("../../../public/custom/RealtimeChart");
        setReady(true);
      } catch (e) {
        console.error("fail", e);
      }
    };
    doAsync();
  }, []);
  async function fetchCount(me) {
    const docRef = doc(db, "active_users", "clickCounter");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      me.updateChart(docSnap.data().count);
    } else {
      me.updateChart(0);
    }
  }
  return (
    <div className={`${theme == "dark" ? "darkmode" : ""} h-full w-full`}>
      {ready ? (
        <ReExt
          xtype="line-real-time-date"
          config={{
            controller: "realtime-ctrl",
            fetchCount: fetchCount,
          }}
          style={{ height: "100%", width: "100%" }}
        />
      ) : (
        <Skeleton count={3} height={100} />
      )}
    </div>
  );
};

export default RealtimeChart;
