"use client";
import ReExt from "@sencha/reext";
import React from "react";
import ReusableDisplayField from "../../../common/DisplayField";
import Image from "next/image";
import { CenterDiv, DisplayDiv } from "@/app/common/CommonDiv";

function UniversityInfo(props) {
  const { univDetails } = props;
  return (
    <div className="flex-1 w-full">
      <div className="flex items-center w-full">
        <ReExt
          style={{ width: 100, height: 100, minHeight: 100, minWidth: 100 }}
          xtype="image"
          config={{
            src: univDetails?.logo || "/images/Default_picture.svg",
            width: 100,
            height: 100,
            alt: "logo",
          }}
        />
        <div className="flex flex-col items-center m-10">
          <ReusableDisplayField
            label="Univ Name:"
            value={univDetails?.name || "Unavailable"}
            labelWidth={120}
            width={350}
            style={{ color: "blue", fontWeight: "bold" }}
          />
          <ReusableDisplayField
            label="Univ Rank:"
            value={univDetails?.rank || "Unknown"}
            labelWidth={120}
            width={350}
          />
          {/* <ReusableDisplayField
            label="Status:"
            value={univDetails?.status ? "Active" : "InActive"}
            labelWidth={120}
            width={350}
            className={`${
              univDetails?.status ? "active-text" : "inactive-text"
            }`}
          /> */}
          <p
            className={`${
              univDetails?.status=="Active" ? "active-text" : "inactive-text"
            }`}
          >
            {univDetails?.status=="Active" ? "Active" : "InActive"}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <DisplayDiv>
          <ReusableDisplayField
            label="Established In:"
            value={univDetails?.established || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Web Link:"
            value={univDetails?.url || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>

        <DisplayDiv>
          <ReusableDisplayField
            label="Location:"
            value={univDetails?.location || "Unknown"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Email:"
            value={univDetails?.email || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
        <DisplayDiv>
          <ReusableDisplayField
            label="SeatsAvailable:"
            value={univDetails?.seats_available || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Phone:"
            value={univDetails?.phone || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
        <ReusableDisplayField
          label="About Univ:"
          value={univDetails?.about || "about:blank"}
          labelWidth={120}
          width={550}
        />
      </div>
    </div>
  );
}

export default UniversityInfo;
