"use client";
import ReExt from "@sencha/reext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import DeleteModal from "../../common/DeleteModal";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "@/app/common/Toast";
import { useMediaQuery } from "@/app/common/hook";
import UnivMobileList from "./UnivMobileList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGlobalContext } from "@/app/context/GlobalContext";

export default function Page() {
  const router = useRouter();
  const { theme } = useGlobalContext();

  const isDesktop = useMediaQuery("(min-width: 960px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 959px)");
  const isMobile = useMediaQuery("(max-width: 599px)");

  const [ready, setReady] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [trigger, setTrigger] = useState(null);

  const onView = (record) => {
    let id = record?.id;
    router.push(`/campus/university/${id}`);
  };

  const onEdit = (record) => {
    let id = record?.id;
    router.push(`/campus/university/add?edit=${id}`);
  };

  const onDelete = (record) => {
    setSelectedData(record);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "university", selectedData?.id));
      ToastGreen("Deleted successfully");
    } catch (error) {
      ToastRed("Error in Deletion");
    } finally {
      setModalVisible(false); // Close the modal
      setSelectedData(null);
      setReady(false);
      setTrigger(new Date());
    }
  };
  const handleClose = () => {
    setModalVisible(false);
  };

  const onAddNew = () => {
    router.push("/campus/university/add");
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
                gridType: "university",
                routerView: onView,
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
                  { text: "Rank", dataIndex: "rank", width: "10px" },
                  { text: "Name", dataIndex: "name", sortable: true, flex: 1 },
                  { text: "Location", dataIndex: "location" },
                  {
                    text: "Status",
                    dataIndex: "status",
                    flex: 1,
                    cell: {
                      encodeHtml: false,
                    },
                    renderer: function (value) {
                      
                      return value == "Active"
                        ? '<div class="active-text">Active</div>'
                        : '<div class="inactive-text">InActive</div>';
                    },
                    filter: "boolean",
                  },
                  {
                    text: "Seats Available",
                    dataIndex: "seats_available",
                    sortable: true,
                    flex: 1,
                  },

                  {
                    text: "Visa Required",
                    dataIndex: "visa_req",
                    renderer: function (value) {
                      return value == "Yes"
                        ? '<div class="active-text">Yes</div>'
                        : '<div class="inactive-text">No</div>';
                    },
                    filter: "boolean",
                  },
                  {
                    xtype: "actioncolumn",
                    sortable: false,
                    menuDisabled: true,
                    text: "Actions",
                    width: 100,
                    items: [
                      {
                        iconCls: "x-fa fa-eye",
                        handler: "onView",
                      },
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
                        style: {
                          color: "red",
                        },
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
            <UnivMobileList />
          )}
        </div>
        {isModalVisible && (
          <DeleteModal
            handleDelete={handleDelete}
            handleClose={handleClose}
            deleteId={selectedData?.id}
            deleteName={selectedData?.name}
          />
        )}
      </div>
    );
  }
}
