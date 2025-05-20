"use client";
import ReExt from "@sencha/reext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UniversityInfo from "./UniversityInfo";
import CourseDetails from "./CourseDetails";
import Gallery from "./Gallery";
import Placements from "./Placements";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function page() {
  const router = useRouter();
  const params = useParams();

  const [univDetails, setUnivDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params?.id) {
      fetchUniversityById(params?.id);
    }
  }, [params]);
  if (loading) {
    return <Skeleton count={6} height={100} />;
  } else {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
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
          <UniversityInfo title="Basic Info" univDetails={univDetails} />
          <CourseDetails title="Courses Offered" univDetails={univDetails} />
          <Gallery title="Gallery" univDetails={univDetails} />
          {/* <Placements title="Placements" />  */}
        </ReExt>
      </div>
    );
  }
}

export default page;
