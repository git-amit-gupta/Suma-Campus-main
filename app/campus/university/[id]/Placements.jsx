import ReExt from "@sencha/reext";
import React from "react";
import ReusableDisplayField from "../../../common/DisplayField";

function Placements(props) {
  const { title } = props;

  return (
    <div className="flex-1 w-full" >
        <ReusableDisplayField value={"Placement Companies"} />
        <ReExt
        xtype="panel"
        style={{
          flex: 1,
          display: "flex",
          width: "100%",
          // height: "150vh",
          height: "100%",
          overflow: "auto",
        }}
        config={{
          defaults: {
            margin: 5,
          },
          cls: "inline-image",
          scrollable: {
            x: false, // Disable horizontal scroll
            y: true, // Enable vertical scroll
          },
          autoSize: true,
          //   layout: {
          //     type: 'vbox',
          //     // align: 'stretch',
          // },
          items: (function () {
            const images = [];
            for (let i = 1; i <= 20; i++) {
              images.push({
                xtype: "component",
                width: 150,
                height: 150,
                style: {
                  backgroundImage: `url('https://placehold.co/600x400/orange/white')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                },
              });
            }
            return images;
          })(),
        }}
      />
</div>
  );
}

export default Placements;
