import ReExt from "@sencha/reext";
import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useMediaQuery } from "./hook";

function DeleteModal({ handleDelete, handleClose, deleteId, deleteName }) {
  const { theme } = useGlobalContext();
    const isDesktop = useMediaQuery("(min-width: 960px)");
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
          width: isDesktop ? "400px":"250px",
          height: "300px",
          zIndex: 1000,
        }}
        className="deleteModal"
      >
        <ReExt
          xtype="panel"
          config={{
            title: "Confirm Deletion",
            modal: true,
            centered: true,
            closable: false,
            width: 300,
            height: 150,
            layout: "fit",
            style:{borderRadius:"4px"},
            items: [
              {
                xtype: "component",
                html: `<p class="text-14">Are you sure you want to ${
                  deleteName !== "Signout" ? `delete item with name` : ""
                } : ${deleteName}?</p>`,
                padding: 20,
              },
            ],
            bbar: [
              {
                xtype: "button",
                text: "Cancel",
                style: { backgroundColor: "#000" },
                handler: handleClose,
              },
              "->",
              {
                xtype: "button",
                text: "Confirm",
                style: { backgroundColor: "#EF4444" },
                handler: handleDelete,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default DeleteModal;
