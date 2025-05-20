import ReExt from "@sencha/reext";
import React from "react";
import { ToastGreen, ToastRed } from "../../../../common/Toast";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/app/common/hook";

function Step1({ handleNext, handleBack, setValue, value }) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 599px)");

  function handleNextStep() {
    let formPanel = this.up("form");
    // console.log("formPanel", formPanel);

    // Get the form object from the form panel
    let form = formPanel.getForm();
    if (form.isValid()) {
      const formData = form.getValues();
      // Manually get the file from the filefield
      let fileField = formPanel.down("filefield[name=photo]");
      let file = fileField.fileInputEl.dom.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          formData.logo = reader.result; // Set the converted Base64 string
          // console.log("Updated Form Data:", formData);
          setValue(formData);
          ToastGreen();
          handleNext();
        };
        reader.readAsDataURL(file); // Start the conversion
      } else {
        formData.logo = value?.logo;
        // console.log("Using Existing Form Data:", formData);
        setValue(formData);
        ToastGreen();
        handleNext();
      }
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
          flex: 1,
          width: "90%",
          // minHeight: 513,
          bodyPadding: 16,
          autoSize: true,
          fullscreen: true,
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
              // {
              //   text: "Back",
              //   handler: handleBack,
              // },
              {
                text: "Next",
                handler: handleNextStep,
                iconCls: "x-fa fa-chevron-circle-right",
              },
            ],
          },

          items: [
            {
              xtype: "textfield",
              fieldLabel: "Applicant Name",
              name: "name",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.name,
              emptyText: "Enter Applicant Name",
            },
            {
              xtype: "numberfield",
              fieldLabel: "Phone No:",
              name: "phone",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.phone,
              emptyText: "Enter phone no",
            },

            {
              xtype: "radiogroup",
              fieldLabel: "Gender", // Label for the radio group
              name: "gender",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              columns: 1,
              vertical: false, // Arrange radio buttons vertically
              items: [
                {
                  boxLabel: "Male",
                  name: "gender",
                  inputValue: "male",
                  checked: value?.gender === "male" ? true : false,
                },
                {
                  boxLabel: "Female",
                  name: "gender",
                  inputValue: "female",
                  checked: value?.gender === "female" ? true : false,
                },
                {
                  boxLabel: "Others",
                  name: "gender",
                  inputValue: "others",
                  checked: value?.gender === "others" ? true : false,
                },
              ],
            },
            {
              xtype: "textfield",
              fieldLabel: "E-mail",
              name: "email",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.email,
              vtype: "email",
              emptyText: "Enter applicant email",
            },
            {
              xtype: "datefield",
              fieldLabel: "DOB",
              name: "dob",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.dob,
              emptyText: "Enter Date of Birth",
              editable: false,
            },
            {
              xtype: "textfield",
              fieldLabel: "Country",
              name: "country",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.country,
              emptyText: "Enter Country Name",
            },
            {
              xtype: "textfield",
              fieldLabel: "State",
              name: "state",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.state,
              emptyText: "Enter State Name",
            },
            {
              xtype: "filefield",
              fieldLabel: "Applicant Photo",
              name: "photo",
              width: "100%",
              emptyText: "Applicant Photo",
              listeners: {
                change: function (filefield) {
                  const file = filefield.fileInputEl.dom.files[0];
                  if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                      Ext.Msg.alert(
                        "Photo Preview",
                        `<Image src="${e.target.result}" width="200" height="200"/>`
                      );
                    };
                    reader.readAsDataURL(file);
                  }
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}

export default Step1;
