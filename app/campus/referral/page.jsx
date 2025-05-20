"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/app/common/hook";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DeleteModal from "@/app/common/DeleteModal";
import ReExt from "@sencha/reext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "@/app/common/Toast";
import ReferralModal from "@/app/common/ReferralModal";
import ReferralMobileList from "./ReferralMobileList";

function page() {
  const router = useRouter();
  const { theme } = useGlobalContext();

  const isDesktop = useMediaQuery("(min-width: 960px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");
  const isMobile = useMediaQuery("(max-width: 599px)");

  const [ready, setReady] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [trigger, setTrigger] = useState(null);

  const onEdit = (record) => {
    setSelectedData(record);
    setModalVisible(true);
  };

  const onDelete = (record) => {
    setSelectedData(record);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "referral", selectedData?.id));
      ToastGreen("Deleted successfully");
    } catch (error) {
      // console.error("Error deleting students:", error);
      ToastRed("Error in Deletion");
    } finally {
      setDeleteModalVisible(false); // Close the modal
      setSelectedData(null);
      setReady(false);
      setTrigger(new Date());
    }
  };
  const handleClose = () => {
    setDeleteModalVisible(false);
    setModalVisible(false);
    setSelectedData({});
  };

  const onAddNew = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const doAsync = async () => {
      try {
        await import("../../../public/custom/SumaList");

        setReady(true);
      } catch (e) {
        console.error("fail", e);
      }
    };
    doAsync();
  }, [trigger]);

  if (!ready) {
    return <Skeleton count={6} height={100} />;
  } else {
    return (
      <div
        style={{ padding: "20px", position: "relative" }}
        className={theme == "dark" ? "darkmode" : ""}
      >
        <div style={{ flex: 1, display: "flex", marginTop: "10px" }}>
          {isDesktop || isTablet ? (
            <ReExt
              xtype="sumalist"
              style={{ width: "100%", height: "100vh" }}
              config={{
                gridType: "referral",
                routerEdit: onEdit,
                onDelete: onDelete,
                onAddNew: onAddNew,
                bodyCls: "gridTabel",
                columns: [
                  {
                    text: "Id",
                    dataIndex: "id",
                    sortable: true,
                    flex: 1,
                  },
                  { text: "Name", dataIndex: "name", sortable: true, flex: 1 },
                  {
                    text: "Account Id",
                    dataIndex: "account_id",
                    flex: 1,
                  },

                  {
                    text: "Referral Count",
                    dataIndex: "count",
                    sortable: true,
                    flex: 1,
                  },
                  {
                    text: "Credit Balance",
                    dataIndex: "credit_balance",
                    flex: 1,
                  },
                  {
                    text: "Credit Status",
                    dataIndex: "credit_status",
                    flex: 1,
                    width: 300,
                    cell: {
                      encodeHtml: false,
                    },
                    renderer: function (value) {
                      return value == "Completed"
                        ? `<div class="active-text">Completed</div>`
                        : value == "Inprogress"
                        ? '<div class="progress-text">InProgress</div>'
                        : '<div class="inactive-text">Rejected</div>';
                    },
                  },
                  {
                    text: "Total Amount Credited",
                    dataIndex: "total_amount_credited",
                    sortable: true,
                    flex: 1,
                  },

                  {
                    xtype: "actioncolumn",
                    sortable: false,
                    menuDisabled: true,
                    text: "Actions",
                    width: 100,
                    items: [
                      // {
                      //   iconCls: "x-fa fa-eye",
                      //   handler: "onView",
                      // },
                      {
                        xtype: "spacer",
                      },
                      {
                        iconCls: "x-fa fa-pencil-alt",
                        tooltip: "Edit",
                        handler: "onEdit",
                      },
                      {
                        xtype: "spacer",
                      },
                      {
                        iconCls: " x-fa fa-times",
                        handler: "onDelete",
                      },
                    ],
                  },
                ],
              }}
              onSelect={(sender, record) => {
                // console.log("row selected", record[0]);
              }}
            />
          ) : (
            <ReferralMobileList/>
          )}
        </div>
        {deleteModalVisible && (
          <DeleteModal
            handleDelete={handleDelete}
            handleClose={handleClose}
            deleteId={selectedData?.id}
            deleteName={selectedData?.name}
          />
        )}
        {/* Add & Edit Modal */}
        {modalVisible && (
          <ReferralModal
            handleClose={handleClose}
            editId={selectedData?.id}
            selectedData={selectedData}
            setTrigger={setTrigger}
            setReady={setReady}
          />
        )}
      </div>
    );
  }
}

export default page;
