import { ToastGreen, ToastRed } from "@/app/common/Toast";
import layout from "@/app/campus/layout";
import ReExt from "@sencha/reext";
import "./stepper.css";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/app/common/hook";

function Step2({ handleNext, handleBack, setValue, value }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 599px)");

  function handleNextStep() {
    let formPanel = this.up("form");
    // console.log("formPanel", formPanel);

    // Get the form object from the form panel
    let form = formPanel.getForm();
    if (form.isValid()) {
      // Log the form data
      const formData = form.getValues();

      setValue(formData);
      ToastGreen();
      handleNext();
    } else {
      ToastRed();
    }
  }

  return (
    <div
      className={`flex-1 flex  ${
        isMobile ? "w-full mt-5 mb-5" : "w-80 mt-10 mb-10"
      }`}
    >
      <ReExt
        xtype="form"
        config={{
          // title: "My Form",
          //   flex: 1,
          width: "90%",
          // minHeight: 513,
          bodyPadding: 16,
          autoSize: true,
          // fullscreen: true,
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
                handler: () => router.push("/campus/students"),
              },
              "->",
              {
                text: "Back",
                handler: handleBack,
                iconCls: "x-fa fa-chevron-circle-left",
              },
              {
                text: "Next",
                handler: handleNextStep,
                iconCls: "x-fa fa-chevron-circle-right",
              },
            ],
          },
          items: [
            {
              xtype: "combobox",
              fieldLabel: "Highest Qualification",
              name: "highest_qualification",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              editable: false,
              store: {
                fields: ["id", "name"],
                data: [
                  { id: 1, name: "High School" },
                  { id: 2, name: "Under Graduate" },
                  { id: 3, name: "Post Graduate" },
                ],
              },
              displayField: "name",
              valueField: "name",
              queryMode: "local",
              value: value?.highest_qualification || "",
            },
            {
              xtype: "combobox",
              fieldLabel: "Medium of Instruction",
              name: "medium",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              editable: false,
              store: {
                fields: ["id", "name"],
                data: [
                  { id: 1, name: "English" },
                  { id: 2, name: "Tamil" },
                  { id: 3, name: "Italian" },
                ],
              },
              displayField: "name",
              valueField: "name",
              queryMode: "local",
              value: value?.medium || "",
            },

            {
              xtype: "textfield",
              fieldLabel: "Highest Education Name",
              name: "education_name",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.education_name || "",
              emptyText: "Enter School / University Name",
            },
            {
              xtype: "numberfield",
              fieldLabel: "Marks in Percentage:",
              name: "marks",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.marks,
              emptyText: "100%",
            },
            {
              xtype: "panel",
              layout: {
                type: "accordion",
              },
              items: [
                {
                  title: "DOCS 1",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Upload Marksheet URL:",
                      name: "marksheet_url",
                      width: "100%",
                      allowBlank: false,
                      msgTarget: "under",
                      value: value?.marksheet_url || "",
                      emptyText: "https://docslink.com",
                    },
                  ],
                },
                {
                  title: "DOCS 2",
                  items: [
                    {
                      xtype: "textfield",
                      fieldLabel: "Upload Other documents URL:",
                      name: "document_url",
                      width: "100%",
                      //allowBlank: false,
                      //msgTarget: "under",
                      value: value?.document_url || "",
                      emptyText: "https://docslink.com",
                    },
                  ],
                },
              ],
            },
            {
              xtype: "combobox",
              fieldLabel: "Visa Status",
              name: "status",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              editable: false,
              store: {
                fields: ["id", "name"],
                data: [
                  { id: 1, name: "Inprogress" },
                  { id: 2, name: "Success" },
                  { id: 3, name: "Rejected" },
                ],
              },
              value: value?.status,
              displayField: "name",
              valueField: "name",
              queryMode: "local",
              // disabled: true,
            },
          ],
        }}
      ></ReExt>
    </div>
  );
}

export default Step2;
