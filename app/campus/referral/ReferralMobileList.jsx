"use client"
import DeleteModal from '@/app/common/DeleteModal';
import ReferralModal from '@/app/common/ReferralModal';
import { ToastGreen, ToastRed } from '@/app/common/Toast';
import { db } from '@/firebase/firebaseConfig';
import ReExt from '@sencha/reext';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


function ReferralMobileList() {
  const router = useRouter();

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
        await import("../../../public/custom/SumaMobileList");
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
            gridType: "referral",
            mobileEdit: onEdit,
            mobileDelete: onDelete,
            onAddNew: onAddNew,
            bodyCls: "mobileCard",
          }}
        />

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
      </>
  )
}
}

export default ReferralMobileList