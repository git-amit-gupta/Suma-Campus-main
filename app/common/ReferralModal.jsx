"use client";
import ReExt from "@sencha/reext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "./Toast";

function ReferralModal({
  handleClose,
  editId = null,
  selectedData = {},
  setTrigger,
  setReady,
}) {
  const handleSubmitData = async () => {
    const formPanel = Ext.getCmp("referralModalForm"); // Get the form by its ID
    if (formPanel) {
      const form = formPanel.getForm();
      const values = form.getValues(); // Retrieve form values
      // console.log("Selected Values:", values); // Log selected values

      if (form.isValid()) {
        if (editId) {
          const docRef = doc(db, "referral", editId);
          await updateDoc(docRef, values);
          ToastGreen("Data Updated Successfully 🎉🎉🎉");
          setTrigger(new Date());
          setReady(false);

          handleClose();
        } else {
          await addDoc(collection(db, "referral"), values);
          ToastGreen("Data added Successfully 🎉🎉🎉");
          setTrigger(new Date());
          setReady(false);

          handleClose();
        }
       
      } else {
       
        ToastRed();
      }
    } else {
      ToastRed();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 99,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "400px",
          height: "300px",
          zIndex: 1000,
        }}
      >
        <ReExt
          xtype="panel"
          config={{
            title: "Referral",
            cls: "ui-titleGreen",
            modal: true,
            centered: true,
            closable: false,
            width: 300,
            height: 400,
            layout: "fit",
            bbar: [
              {
                xtype: "button",
                text: "Cancel",
                cls: "ui-black",
                handler: handleClose,
              },
              "->",
              {
                xtype: "button",
                text: "Confirm",
                cls: "ui-green",
                handler: handleSubmitData,
              },
            ],
          }}
        >
          <ReExt
            xtype="form"
            config={{
              // title: "My Form",
              // itemId: 'referralModalForm',
              id: "referralModalForm",

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

              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "Name",
                  name: "name",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  emptyText: "Enter Name",
                  value: selectedData?.name,
                },
                {
                  xtype: "textfield",
                  fieldLabel: "Account Id",
                  name: "account_id",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  emptyText: "Enter Account Id",
                  value: selectedData?.account_id,
                },
                {
                  xtype: "numberfield",
                  fieldLabel: "Referral Count",
                  name: "count",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  emptyText: "Enter Referral Count",
                  value: selectedData?.count,
                },
                {
                  xtype: "numberfield",
                  fieldLabel: "Credit Balance",
                  name: "credit_balance",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  emptyText: "Enter Credit Balance",
                  value: selectedData?.credit_balance,
                },
                {
                  xtype: "combobox",
                  fieldLabel: "Credit Status",
                  name: "credit_status",
                  width: "100%",
                  //allowBlank: false,
                  //msgTarget: "under",
                  editable: false,
                  store: {
                    fields: ["id", "name"],
                    // data: [],
                    data: [
                      { id: 1, name: "Inprogress" },
                      { id: 2, name: "Completed" },
                      { id: 3, name: "Rejected" },
                    ],
                  },
                  displayField: "name",
                  valueField: "name",
                  queryMode: "local",
                  // disabled: true,
                  value: selectedData?.credit_status,
                },
                {
                  xtype: "numberfield",
                  fieldLabel: "Total Amount Credited",
                  name: "total_amount_credited",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  emptyText: "Enter Total Amount Credited",
                  value: selectedData?.total_amount_credited,
                },
              ],
            }}
          />
        </ReExt>
      </div>
    </div>
  );
}

export default ReferralModal;
