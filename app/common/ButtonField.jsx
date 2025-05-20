import ReExt from "@sencha/reext";
import React from "react";

function ButtonField({
  text = "button",
  iconCls = "x-fa fa-info",
  disabled = false,
  size = "medium",
  iconAlign = "left",
  style = {},
  handleClick,
}) {
  return (
      <ReExt
        xtype="button"
        config={{
          text: text,
          iconCls: iconCls,
          cls:"cool",
          disabled: disabled,
          // margin: "10 10 10 10",
          enableToggle: true,
          style: {
            borderRadius: "5px",
            ...style,
          },
          scale: size,
          iconAlign: "left",
          // href:"https://google.com"
        }}
        onClick={(button, e, eOpts) => {
          // console.log(`onCLick`, button, e, eOpts);
          handleClick();
        }}
        // onMouseover={() => {
        //   console.log("Mouse over button");
        // }}
      />
  );
}

export default ButtonField;
