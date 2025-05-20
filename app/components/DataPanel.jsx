import ReExt from "@sencha/reext";
import React from "react";

function DataPanel({ title }) {
  return (
    <ReExt
      xtype="panel"
      style={{ width: "100%", height: "99%",minHeight:260 }}
      config={{
        flex: 1,
        title: title,
        // width:"100%",
        // height:"100%",
        bodyPadding: 10,
        frame: true,
        // title:"cool",
        layout: { type: "vbox", align: "stretch" },
        html: "<p>Charts Visible only in Desktop</p>",
      }}
    />
  );
}

export default DataPanel;
