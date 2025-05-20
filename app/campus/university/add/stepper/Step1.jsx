"use client";
import ReExt from "@sencha/reext";
import React, { useEffect, useState } from "react";
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
      let fileField = formPanel.down("filefield[name=logo]");
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
          width: "100%",
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
                handler: () => router.push("/campus/university"),
              },
              "->",
              // {
              //   text: "Back",
              //   handler: handleBack,
              // },
              {
                text: "Next",
                iconCls: "x-fa fa-chevron-circle-right",
                handler: handleNextStep,
              },
            ],
          },
          items: [
            {
              xtype: "textfield",
              fieldLabel: "University Name",
              name: "name",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.name,
              emptyText: "Enter University Name",
            },
            {
              xtype: "textfield",
              fieldLabel: "Location",
              name: "location",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.location,
              emptyText: "Enter University Location",
            },
            {
              xtype: "datefield",
              fieldLabel: "Established Date",
              name: "established",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.established,
              editable: false,

              emptyText: "Enter University Established Year",
            },
            {
              xtype: "radiogroup",
              fieldLabel: "Visa Required", // Label for the radio group
              name: "visa_required",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              columns: 1,
              vertical: false, // Arrange radio buttons vertically
              items: [
                {
                  boxLabel: "Yes",
                  name: "visa_req",
                  inputValue: "Yes",
                  checked: value?.visa_req === "Yes" ? true : false, // Default selected option
                },
                {
                  boxLabel: "No",
                  name: "visa_req",
                  inputValue: "No",
                  checked: value?.visa_req === "No" ? true : false,
                },
              ],
            },

            {
              xtype: "numberfield",
              fieldLabel: "Phone No:",
              name: "phone",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.phone,
              emptyText: "Enter university phone no",
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
              emptyText: "Enter university email",
            },
            {
              xtype: "textfield",
              fieldLabel: "URL",
              name: "url",
              width: "100%",
              // allowBlank: false,
              // msgTarget: "under",
              value: value?.url,
              emptyText: "Enter University Website",
            },
            {
              xtype: "numberfield",
              fieldLabel: "Univeristy Rank",
              name: "rank",
              width: "100%",
              allowBlank: false,
              allowDecimals: false,
              msgTarget: "under",
              value: value?.rank,
              emptyText: "Enter Rank Number",
            },
            {
              xtype: "combobox",
              fieldLabel: "Status",
              name: "status",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              editable: false,
              value: value?.status == "Active" ? "Active" : "InActive",
              store: {
                fields: ["id", "name"],
                data: [
                  { id: 1, name: "Active" },
                  { id: 2, name: "InActive" },
                ],
              },
              displayField: "name",
              valueField: "name",
              queryMode: "local",
            },

            {
              xtype: "numberfield",
              fieldLabel: "Seats Available",
              name: "seats_available",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              value: value?.seats_available,
              emptyText: "Enter Seats Available in University ",
            },

            {
              xtype: "filefield",
              fieldLabel: "University Logo",
              name: "logo",
              width: "100%",
              emptyText: "University Logo",
              // value: value?.logo,
              listeners: {
                change: function (filefield) {
                  const file = filefield.fileInputEl.dom.files[0];
                  if (file && file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                      Ext.Msg.alert(
                        "Logo Preview",
                        `<img src="${e.target.result}" width="200" height="200"/>`
                      );
                    };
                    reader.readAsDataURL(file);
                  }
                },
              },
            },

            {
              xtype: "textareafield",
              fieldLabel: "About Info",
              name: "about",
              width: "100%",
              allowBlank: false,
              msgTarget: "under",
              emptyText: "Enter your text",
              value: value?.about,
            },
          ],
        }}
      />
    </div>
  );
}

export default Step1;
