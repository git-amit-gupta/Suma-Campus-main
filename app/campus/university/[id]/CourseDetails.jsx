import ReExt from "@sencha/reext";
import React from "react";
import ReusableDisplayField from "../../../common/DisplayField";

function CourseDetails(props) {
  const { univDetails } = props;

  return (
    <div className="flex-1 w-full h-full">
      <ReusableDisplayField value={"Courses Offered"} />

      <ReExt
        xtype="grid"
        style={{ width: "100%", height: "420px", overflow: "auto" }}
        config={{
          // title: "grid",
          columns: [
            {
              text: "Name",
              dataIndex: "name",
              flex: 1,
              editable: true,
              editor: {
                xtype: "textfield",
                allowBlank: false,
              },
            },
            {
              text: "Duration",
              dataIndex: "duration",
              flex: 1,
              editable: true,
              editor: {
                xtype: "textfield",
                allowBlank: false,
              },
            },
            {
              text: "Fees",
              dataIndex: "fees",
              flex: 1,
              editable: true,
              editor: {
                xtype: "textfield",
                allowBlank: false,
              },
            },
          ],
          store: {
            storeId: "dynamicStore",
            data: {
              items: univDetails?.courses,
            },
            proxy: {
              type: "memory",
              reader: {
                type: "json",
                rootProperty: "items",
              },
            },
          },
          plugins: {
            cellediting: {
              clicksToEdit: 1, // Start editing with a single click
            },
          },
        }}
      />
    </div>
  );
}

export default CourseDetails;
