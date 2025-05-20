import ReExt from "@sencha/reext";
import Image from "next/image";
import React, { Fragment } from "react";
import ReusableDisplayField from "../../../common/DisplayField";

function Gallery(props) {
  const { univDetails } = props;


  return (
    <div className="flex-1 w-full h-full" style={{overflow:"auto"}}>
      <ReusableDisplayField value={"University Gallery"} />
      {/* <ReExt
        xtype="dataview"
        style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
        config={{
          itemTpl: `
              <div style="padding: 5px;">
                <img src="{base64}" style="width: 100vw; height: 200px; object-fit: cover; border-radius: 8px;" />
              </div>
            `,
          store: {
            fields: ["id", "base64"],
            data: univDetails?.gallery,
          },
          scrollable: "vertical",
        }}
      /> */}
      {univDetails?.gallery?.length > 0 &&
        univDetails.gallery.map((i) => {
          return <Fragment key={i?.id}><Image key={i.id} src={i.base64} width={600} height={400} alt={i.id}/></Fragment>;
        })}
    </div>
  );
}

export default Gallery;
