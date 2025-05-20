import React, { useEffect, useState } from "react";
import "./content.css";
import { DownArrowIcon, UpArrowIcon } from "@/app/common/icons";
import { useRouter } from "next/navigation";

import { useMediaQuery } from "@/app/common/hook";

const data = [
  {
    id: 1,
    title: "Registered Users",
    stats: true,
    count: 202,
    count2: 23,
    path: "/campus/students",
  },
  // {
  //   id: 2,
  //   title: "Students Admitted to Universities",
  //   stats: true,
  //   count: 12,
  //   count2: 23,
  // },
  {
    id: 3,
    title: "Application in Progress",
    stats: true,
    count: 45,
    count2: 3,
    path: "/campus/students",
  },
  {
    id: 4,
    title: "New Referrals",
    stats: false,
    count: 306,
    count2: 19,
    path: "/campus/referral",
  },
  {
    id: 5,
    title: "Partner Universities",
    stats: true,
    count: 145,
    count2: 3,
    path: "/campus/university",
  },
  {
    id: 6,
    title: "Visa Approvals",
    stats: false,
    count: 65,
    count2: 3,
    path: "/campus/students",
  },
];
function Content() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 599px)");

  return (
    <div className={`flex w-full ${isMobile ? "justify-center" : ""}`}>
      <div className="Maincontainer">
        {data.map((i) => (
          <div className="card2" key={i?.id}>
            <div>
              <h4
                className={`text-gray-500 cardTitle ${isMobile && "text-16"}`}
              >
                {i?.title}
              </h4>

              <p
                className={`text-gray-700 mt-5 cardText ${
                  isMobile && "text-16"
                }`}
                style={{ fontWeight: 600 }}
              >
                {i?.count}
              </p>
            </div>
            <div className="flex items-center mt-10" style={{ gap: 5 }}>
              <div
                className="flex items-center justify-center"
                style={{ width: 16, height: 16 }}
              >
                {i?.stats ? (
                  <UpArrowIcon color={"#22C55E"} />
                ) : (
                  <DownArrowIcon color={"#EF4444"} />
                )}
              </div>
              <p
                className={`text-14 fontspace ${
                  i?.stats ? "text-green-500" : "text-red-500"
                }`}
                style={{ fontWeight: 500 }}
              >
                {i?.count2}% {i?.stats ? "increase" : "decrease"}
              </p>
            </div>
            <p className="text-14 text-gray-700 ml-2 fontspace cardText">
              from last month
            </p>
            <div className="go-corner" onClick={() => router.push(i?.path)}>
              <div className="go-arrow">→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
