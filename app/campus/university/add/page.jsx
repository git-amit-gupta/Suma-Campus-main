"use client";
import ReExt from "@sencha/reext";
import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-js";
import "react-stepper-js/dist/index.css";
import Step1 from "./stepper/Step1";
import Step2 from "./stepper/Step2";
import Step3 from "./stepper/Step3";
import { useParams, useSearchParams } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddUniversity = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  let editId = searchParams.get("edit");

  const [univDetails, setUnivDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeItem, setActiveItem] = useState(1);
  const [step1Value, setStep1Value] = useState({ name: "" });
  const [step2Value, setStep2Value] = useState([
    {
      id: 1,
      fees: "1000",
      duration: "1 Years",
      name: "Course Name",
    },
  ]);
  const [step3Value, setStep3Value] = useState([]);

  const handleNext = () => {
    setActiveItem((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveItem((prev) => Math.max(prev - 1, 0));
  };
  const fetchUniversityById = async (searchId) => {
    if (!searchId) return alert("Please enter an ID");
    try {
      const docRef = doc(db, "university", searchId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUnivDetails({ id: docSnap.id, ...docSnap.data() });
      } else {
        setUnivDetails(null);
        alert("No university found with this ID");
      }
    } catch (error) {
      console.error("Error fetching by ID:", error);
    }
  };
  useEffect(() => {
    if (editId) {
      fetchUniversityById(editId);
    } else {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (univDetails && editId) {
      setStep1Value(univDetails);
      setStep2Value(univDetails.courses);
      setStep3Value(univDetails.gallery);
      setLoading(false);
    }
  }, [univDetails]);

  return (
    <div className="h-full flex flex-col items-center" style={{ minHeight: "613px" }}>
      <Stepper
        color="#23b561"
        fontSize="18px"
        fontColor="#18aed6"
        steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
        currentStep={activeItem}
      />
      {loading ? (
        <Skeleton count={6} height={100} />
      ) : (
        <>
          {activeItem == 1 ? (
            <Step1
              handleBack={handleBack}
              handleNext={handleNext}
              setValue={setStep1Value}
              value={step1Value}
            />
          ) : activeItem == 2 ? (
            <Step2
              handleBack={handleBack}
              handleNext={handleNext}
              setValue={setStep2Value}
              value={step2Value}
            />
          ) : activeItem == 3 ? (
            <Step3
              handleBack={handleBack}
              setValue={setStep3Value}
              value={step3Value}
              stepValues={{ step1Value, step2Value }}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default AddUniversity;
