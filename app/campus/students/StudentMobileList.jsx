"use client";
import ReExt from "@sencha/reext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import DeleteModal from "../../common/DeleteModal";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { ToastGreen, ToastRed } from "@/app/common/Toast";
import { useMediaQuery } from "@/app/common/hook";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './mobilelist.css';

export default function StudentMobileList() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const [ready, setReady] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedData, setSelectedData] = useState(null);
  const [trigger, setTrigger] = useState(null);

  const onView = (record) => {
    let id = record?.id;
    router.push(`/campus/students/${id}`);
  };

  const onEdit = (record) => {
    let id = record?.id;
    router.push(`/campus/students/add?edit=${id}`);
  };

  const onDelete = (record) => {
    setSelectedData(record);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "students", selectedData?.id));
      ToastGreen("Deleted successfully");
    } catch (error) {
      // console.error("Error deleting students:", error);
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
    router.push("/campus/students/add");
  };

  useEffect(() => {
    const doAsync = async () => {
      try {
        await import("../../../public/custom/SumaMobileList");

        setReady(true);
      } catch (e) {
        console.error("fail", e);
      }
    };
    doAsync();
  }, [trigger, isDesktop]);

  if (!ready) {
    return <Skeleton count={6} height={100} />;
  } else {
    return (
      <>
        <ReExt
          xtype="sumaMobile-list"
          style={{
            flex: 2,
            border: "1px solid gray",
            width: "100%",
            height: "100vh",
          }}
          config={{
            gridType: "students",
            mobileView: onView,
            mobileEdit: onEdit,
            mobileDelete: onDelete,
            onAddNew: onAddNew,
            bodyCls: "mobileCard",
          }}
        />

        {isModalVisible && (
          <DeleteModal
            handleDelete={handleDelete}
            handleClose={handleClose}
            deleteId={selectedData?.id}
            deleteName={selectedData?.name}
          />
        )}
      </>
    );
  }
}
