import CourseModal from "@/app/common/CourseModal";
import ReExt from "@sencha/reext";
import { useEffect, useRef, useState } from "react";
import "./stepper.css";
import ButtonField from "@/app/common/ButtonField";
import { ToastGreen, ToastRed } from "@/app/common/Toast";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/app/common/hook";

function Step3({ handleBack, setValue, value, stepValues }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let editId = searchParams.get("edit");
  const isMobile = useMediaQuery("(max-width: 599px)");

  const [show, setShow] = useState(false);
  const [selectedList, setSelectedList] = useState(value || []);
  const courseListRef = useRef(selectedList);

  // Keep the ref updated with the latest courseList
  useEffect(() => {
    courseListRef.current = selectedList;
  }, [selectedList]);

  function handleClose() {
    setShow(false);
  }
  function handleDelete(id) {
    setSelectedList((prev) => prev.filter((item, index) => index !== id));
  }
  async function handleSubmit(step3Data) {
    setValue(step3Data);
    let uploadObj = {
      ...stepValues?.step1Value,
      ...stepValues?.step2Value,
      logo: stepValues?.step1Value?.logo || "",
      selectedUniversity: step3Data,
      timestamp: Date.now(),
    };
    try {
      if (editId) {
        const docRef = doc(db, "students", editId);
        await updateDoc(docRef, uploadObj);
        ToastGreen("Data Updated Successfully 🎉🎉🎉");
      } else {
        await addDoc(collection(db, "students"), uploadObj);
        ToastGreen("Data added Successfully 🎉🎉🎉");
      }
      router.push("/campus/students");
    } catch (error) {
      ToastRed(
        "Upload Failed",
        "Error sending files to DB, Upload File with size less than 10 kb"
      );
    }
  }

  return (
    <div
      className={`flex-1 flex  ${
        isMobile ? "w-full mt-5 mb-5" : "w-80 mt-10 mb-10"
      }`}
    >
      {show && (
        <CourseModal
          handleClose={handleClose}
          handleAddData={(data) => {
            setSelectedList((prev) => [
              ...prev,
              {
                name: data?.university,
                course: data?.selectedCourse,
                status: data?.status,
              },
            ]);
          }}
        />
      )}
      <ReExt
        xtype="panel"
        config={{
          flex: 1,
          width: "90%",
          bodyPadding: 16,
          scrollable: {
            x: false, // Disable horizontal scroll
            y: true, // Enable vertical scroll
          },
          // title: "grid",
          tbar: [
            {
              xtype: "button",
              text: "Add",
              iconCls: "x-fa fa-plus-circle",
              disabled: false,
              handler: function () {
                setShow(true);
              },
            },
          ],
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
                text: "Submit",
                iconCls: "x-fa fa-check-circle",
                handler: function () {
                  handleSubmit(courseListRef.current);
                },
              },
            ],
          },
        }}
      >
        <div id="course-wrapper">
          {selectedList.map((item, i) => (
            <div className="course-body gap-10" key={i}>
              <div className="flex flex-col gap-10">
                <h3>University: {item?.name}</h3>
                <h4 className="text-gray-700">Course: {item?.course}</h4>
                <h5 className="text-gray-700">
                  Status: {item?.status || "Unavailable"}
                </h5>
              </div>
              <ButtonField
                text="Cancel"
                handleClick={() => handleDelete(i)}
                iconCls="x-fa fa-trash"
                style={{
                  backgroundColor: "#ef4444",
                  color: "black",
                  marginTop: "10px",
                }}
              />
            </div>
          ))}
        </div>
      </ReExt>
    </div>
  );
}

export default Step3;
