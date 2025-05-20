import ReExt from "@sencha/reext";
import React, { useEffect, useState } from "react";
import { ToastGreen, ToastRed } from "../../../../common/Toast";
import DeleteModal from "@/app/common/DeleteModal";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/app/common/hook";

function Step2({ handleNext, handleBack, setValue, value }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 599px)");

  const [data, setData] = useState(value);

  function addNewRow() {
    const newRow = { rowIdx: data.length + 1, name: "" };
    setData((prev) => [...prev, newRow]);
  }
  function handleNextStep() {
    const store = Ext.getStore("dynamicStore");
    // console.log("Saved Data:", store?.config?.data?.items);

    if (store) {
      // store.loadData(data); // Sync store with state
      let courseDetails = store?.config?.data?.items;
      if (courseDetails?.length > 0) {
        setValue(courseDetails);
        ToastGreen();
        handleNext();
      } else {
        ToastRed();
      }
    }
  }

  return (
    <div
      className={`flex-1 flex  ${
        isMobile ? "w-full mt-5 mb-5" : "w-80 mt-10 mb-10"
      }`}
    >
      <ReExt
        xtype="panel"
        config={{
          // title: "My Form",
          flex: 1,
          width: "100%",
          bodyPadding: 16,
          scrollable: {
            x: false, // Disable horizontal scroll
            y: true, // Enable vertical scroll
          },
          dockedItems: {
            dock: "bottom",
            xtype: "toolbar",
            items: [
              {
                text: "Cancel",
                iconCls: "x-fa fa-times",
                handler: () => router.push("/campus/university"),
              },
              "->",
              {
                text: "Back",
                iconCls: "x-fa fa-chevron-circle-left",
                handler: handleBack,
              },
              {
                text: "Next",
                iconCls: "x-fa fa-chevron-circle-right",
                handler: handleNextStep,
              },
            ],
          },
        }}
      >
        <ReExt
          xtype="grid"
          style={{ width: "825px", height: "420px" }}
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
                items: data,
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
            tbar: [
              "->",
              {
                text: "Add Row",
                iconCls: "x-fa fa-plus-circle",
                handler: addNewRow,
              },

              // {
              //   text: "Save Data",
              //   iconCls: "x-fa fa-save",
              //   handler: handleSaveData,
              // },
            ],
          }}
          onEdit={(editor, context) => {
            setData((prevData) => {
              const updatedData = [...prevData];
              updatedData[context.rowIdx] = { ...context.record.data };
              return updatedData;
            });
          }}
        />
      </ReExt>
    </div>
  );
}

export default Step2;
