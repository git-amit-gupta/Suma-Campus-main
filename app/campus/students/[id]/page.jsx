"use client";
import ReExt from "@sencha/reext";
import {
  useParams,
  useRouter,
} from "next/navigation";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import StudentInfo from "./StudentInfo";

function page() {
  const router = useRouter();
  const params = useParams();

  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchstudentsById = async (searchId) => {
    if (!searchId) return alert("Please enter an ID");
    try {
      const docRef = doc(db, "students", searchId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStudentDetails({ id: docSnap.id, ...docSnap.data() });
      } else {
        setStudentDetails(null);
        alert("No students found with this ID");
      }
    } catch (error) {
      console.log("Error fetching by ID:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (params?.id) {
      fetchstudentsById(params?.id);
    }
  }, [params]);

  return (
    <div style={{ display: "flex", minHeight: "90vh" }}>
      <ReExt
        xtype="tabpanel"
        config={{
          activeTab: 0, // Set the first tab as active
          layout: "card",
          // frame: true,
          defaults: {
            bodyPadding: 10,
          },
          innerCls: "cool",
          scrollable: {
            x: false, // Disable horizontal scroll
            y: true, // Enable vertical scroll
          },
        }}
      >
        <StudentInfo title="Applicant Info" studentDetails={studentDetails}/>

      </ReExt>
    </div>
  );
}

export default page;
