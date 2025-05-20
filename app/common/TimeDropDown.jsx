import ReExt from "@sencha/reext";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useMediaQuery } from "./hook";
import moment from "moment-timezone";

function TimeDropDown() {
  const { setGlobalTime,globalTime } = useGlobalContext();
  const isDesktop = useMediaQuery("(min-width: 960px)");
    const isMobile = useMediaQuery("(max-width: 599px)");
  

  const [selectedValue, setSelectedValue] = useState("");

  const momentNames = useMemo(() => {
    return moment.tz.names();
  }, []);

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

    // const interval = setInterval(updateTime, 60000);

    // return () => clearInterval(interval);
  }, [selectedValue]);
  return (
    <div style={isMobile ? { width: "100%" } : { width: "25%" }}>
      <ReExt
        xtype="combobox"
        style={{ height: "36px" }}
        config={{
          cls: "time",
          // fieldLabel: "Global Time",
          store: {
            data: momentNames.map((country) => ({ country })),
          },
          displayField: "country",
          valueField: "country",
          value: selectedValue,
          queryMode: "local",
          editable: true,
          width: 450,
          labelWidth: 150,
        }}
        onSelect={(combo, record) => {
          localStorage.setItem("zone", record?.get("country"));
          setSelectedValue(record.get("country")); // Update selected value
        }}
      />
    </div>
  );
}

export default TimeDropDown;
