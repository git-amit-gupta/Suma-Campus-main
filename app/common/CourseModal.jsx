"use client";
import ReExt from "@sencha/reext";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "./Toast";

function CourseModal({ handleClose, handleAddData }) {
  const handleSubmitData = async () => {
    const formPanel = Ext.getCmp("courseModalForm"); // Get the form by its ID
    if (formPanel) {
      const form = formPanel.getForm();
      const values = form.getValues(); // Retrieve form values
      if (form.isValid()) {
        handleAddData(values);
        handleClose();
        ToastGreen("Course added successfully");
      } else {
        
        ToastRed();
      }
    } else {
      console.error("Form panel not found");
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
            title: "Select a Course",
            cls: "ui-titleGreen",
            modal: true,
            centered: true,
            closable: false,
            width: 300,
            height: 400,
            layout: "fit",
            // items: [
            //   {
            //     xtype: "component",
            //     html: `<p>Are you sure you want to delete item with name</p>`,
            //     padding: 20,
            //   },
            // ],
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
              // itemId: 'courseModalForm',
              id: "courseModalForm",

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
                  xtype: "combobox",
                  fieldLabel: "University",
                  name: "university",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  editable: false,
                  store: {
                    fields: ["id", "name"],
                    data: [],
                  },
                  displayField: "name",
                  valueField: "name",
                  queryMode: "local",
                  listeners: {
                    afterrender: async function (combo) {
                      // Fetch data from Firebase
                      const { db, collection, getDocs } = await import(
                        "../../firebase/firebaseConfig"
                      ); // Import Firebase functions

                      try {
                        const querySnapshot = await getDocs(
                          collection(db, "university")
                        ); // Replace 'status' with your Firebase collection name
                        const data = querySnapshot.docs.map((doc) => ({
                          id: doc.id,
                          name: doc.data().name, // Ensure 'name' matches the field in your Firebase documents
                        }));
                        // Load the data into the combobox store
                        combo.getStore().loadData(data);
                      } catch (error) {
                        console.error(
                          "Error fetching combobox data from Firebase:",
                          error
                        );
                      }
                    },
                    change: async function (combo, newValue) {
                      // Fetch data for the second combobox based on the selected value
                      const secondCombo = combo
                        .up("form")
                        .down("[name=selectedCourse]");
                      const {
                        db,
                        getDoc,
                        doc,
                        query,
                        collection,
                        where,
                        getDocs,
                      } = await import("../../firebase/firebaseConfig"); // Import Firebase functions

                      try {
                        const q = query(
                          collection(db, "university"),
                          where("name", "==", newValue)
                        );
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                          const doc = querySnapshot.docs[0]; // Get the first matching document
                          const data = doc.data();
                          secondCombo.getStore().loadData(data.courses); // Update the second combobox store
                        }
                      } catch (error) {
                        console.error(
                          "Error fetching dependent combobox data:",
                          error
                        );
                      }
                    },
                  },
                },
                {
                  xtype: "combobox",
                  fieldLabel: "Course",
                  name: "selectedCourse",
                  width: "100%",
                  allowBlank: false,
                  msgTarget: "under",
                  // multiSelect: true,
                  editable: false,
                  store: {
                    fields: ["id", "name"],
                    data: [],
                  },
                  displayField: "name",
                  valueField: "name",
                  queryMode: "local",
                },
                {
                  xtype: "combobox",
                  fieldLabel: "Visa Status",
                  name: "status",
                  width: "100%",
                  //allowBlank: false,
                  //msgTarget: "under",
                  editable: false,
                  store: {
                    fields: ["id", "name"],
                    // data: [],
                    data: [
                      { id: 1, name: "InProgress" },
                      { id: 2, name: "Granted" },

                      // { id: 3, name: "Success" },
                      { id: 4, name: "Rejected" },
                    ],
                  },
                  displayField: "name",
                  valueField: "name",
                  queryMode: "local",
                  // disabled: true,
                },
              ],
            }}
          />
        </ReExt>
      </div>
    </div>
  );
}

export default CourseModal;
