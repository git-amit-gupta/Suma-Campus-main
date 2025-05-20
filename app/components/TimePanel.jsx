import ReExt from "@sencha/reext";
import React, { useEffect, useState } from "react";
import { ToastGreen, ToastRed } from "../common/Toast";

const TimePanel = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const docRef = doc(db, "times", "timeData"); // Replace with your collection and doc ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStartTime(data.startTime);
          setEndTime(data.endTime);
        } else {
          console.log("No data found!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchTimeData();
  }, []);

  function handleSubmit() {
    try {
      ToastGreen("Successfully submitted 🥳🥳");
    } catch (err) {
      ToastRed("Error submitting","Please try again");
    }
  }
  return (
    <ReExt
      xtype="panel"
      style={{width: "100%", height: "99%",minHeight:260}}
      config={{
        title: "Time Panel",
        layout: "vbox",
        // width: 300,
        // height: 200,
        bodyPadding:10,

        items: [
          {
            xtype: "timefield",
            fieldLabel: "Start Time",
            name: "startTime",
            width: 250,
            increment: 10, // Minute increment for dropdown
            format: "H:i", // Display format
            value: startTime,
            listeners: {
              change: (field, newValue) => setStartTime(newValue),
            },
            
          },
          {
            xtype: "timefield",
            fieldLabel: "End Time",
            name: "endTime",
            width: 250,
            increment: 10,
            format: "H:i",
            listeners: {
              change: (field, newValue) => setEndTime(newValue),
            },
          },
        ],
        dockedItems: {
          dock: "bottom",
          xtype: "toolbar",
          items: [
            "->",
            {
              text: "Submit",
              iconCls: "x-fa fa-save",
              handler: handleSubmit,
            },

            // {
            //   text: "Back",
            //   handler: handleBack,
            // },
          ],
        },
      }}
    ></ReExt>
  );
};

export default TimePanel;
