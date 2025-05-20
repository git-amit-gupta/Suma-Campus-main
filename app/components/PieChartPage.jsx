"use client";
import { useEffect, useState } from "react";
import ReExt from "@sencha/reext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PieChartPage = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "university"));
        let universities = [];

        querySnapshot.forEach((doc) => {
          universities.push({
            university: doc.data().name, // university name field
            seats: doc.data().seats_available || 0, // seats_available
          });
        });

        // Sort by seats_available in descending order and get top 5
        const top5Universities = universities
          .sort((a, b) => b.seats - a.seats)
          .slice(0, 5);

        setChartData(top5Universities);
      } catch (error) {
        console.error("Error fetching university data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const chartConfig = {
    xtype: "polar",
    width: 600,
    height: 400,
    insetPadding: 20,
    innerPadding: 10,
    cls: "panelcls",
    title: "Remaining Seats",
    shadow: true,
    animation: { easing: "easeOut", duration: 500 },
    legend: { docked: "bottom" },
    interactions: ["rotate", "itemhighlight"],
    store: {
      fields: ["university", "seats"],
      data: chartData,
    },
    series: [
      {
        type: "pie",
        angleField: "seats",
        label: {
          field: "university",
          display: "rotate",
          font: "16px Arial",
          contrast: true,
        },
        highlight: true,
        tooltip: {
          trackMouse: true,
          renderer: (tooltip, record) => {
            tooltip.setHtml(
              record.get("university") + ": " + record.get("seats") + "seats"
            );
          },
        },
      },
    ],
  };
  return (
    <>
      {loading ? (
        <Skeleton count={3} height={100} />
      ) : (
        <ReExt xtype="polar" style={{ borderRadius: 8 ,boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",}} config={chartConfig} />
      )}
    </>
  );
};

export default PieChartPage;
