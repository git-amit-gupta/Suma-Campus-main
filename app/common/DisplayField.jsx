import React from "react";
import ReExt from "@sencha/reext";

const ReusableDisplayField = ({
  label,
  value,
  labelAlign = "left",
  labelWidth = 100,
  width = 300,
  style = {},
  className=""
}) => {
  return (
    <ReExt
      xtype="displayfield"
      config={{
        fieldLabel: label, // Label for the field
        value: value, // Value to display
        labelAlign: labelAlign, // Align the label (left, right, top)
        labelWidth: labelWidth, // Width of the label
        width: width, // Total width of the field
        // href: "https://google.com",
        baseCls:className,
        style: {
          ...style, // Merge custom styles
        },
      }}

    />
  );
};

export default ReusableDisplayField;
