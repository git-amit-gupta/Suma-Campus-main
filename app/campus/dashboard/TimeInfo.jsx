import { useGlobalContext } from "@/app/context/GlobalContext";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import './content.css'

function TimeInfo() {
  const { globalTime, setGlobalTime } = useGlobalContext();
  const [selectedValue, setSelectedValue] = useState("UCT");
  useEffect(() => {
    const selectZone = localStorage.getItem("zone") || "UTC";
    setSelectedValue(selectZone);
  }, []);
  useEffect(() => {
    const updateTime = () => {
      if (selectedValue) {
        const time = moment().tz(selectedValue).format("YYYY-MM-DD HH:mm");
        // setZoneTime(time);
        setGlobalTime(time);
      }
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [selectedValue]);
  return (
    <div className="flex flex-col items-center timeContent">
      <p className={`fontspace text-12 align-center`}>
        {moment(globalTime).format("dddd, MMMM DD, YYYY")}
      </p>
      <p className={`fontspace text-12 ml-10 mr-10`}>
        {moment(globalTime).format("hh:mm A")} /
        {moment.tz(globalTime, selectedValue).format("z")}
      </p>
    </div>
  );
}

export default TimeInfo;
