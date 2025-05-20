"use client";
import ReExt from "@sencha/reext";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const SampleData = () => {
  const [universities, setUniversities] = useState([]);

  const fetchUniversities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "university"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUniversities(data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    }
  };
  const fetchUniversityById = async () => {
    // if (!searchId) return alert('Please enter an ID');
    try {
      const docRef = doc(db, "university", "3VNo61x5XO81L5X5k6HC");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // setSearchResult({ id: docSnap.id, ...docSnap.data() });
        console.log("search", docSnap.id, docSnap.data());
      } else {
        // setSearchResult(null);
        alert("No university found with this ID");
      }
    } catch (error) {
      console.error("Error fetching by ID:", error);
    }
  };
  // Add a new university
  const addUniversity = async () => {
    let newObj = {
      seats_available: "85",

      gallery: [
        // "https://placehold.co/600x400/000000/FFF",
        "https://picsum.photos/200/300",
        //  "https://picsum.photos/200/300"
      ],
      logo: "https://placehold.co/60x40",
      courses: [
        {
          id: "1",
          fees: "65000",
          duration: "1 Years",
          name: "Msater of Civil",
        },
        {
          id: "2",
          fees: "2000",
          duration: "3 Years",
          name: "Master of Sports",
        },
      ],
      url: "https://placehold.co",
      about: "Lorem Ipsum is simply dummy text ",
      email: "cit@gmail.com",
      status: true,
      rank: "1",
      name: "CIT univ",
      phone: 44444444,
      location: "Srilanka",
      visa_req: false,
      established: "2001",
      timestamp: Date.now(),
    };


  

    try {
        addDoc(collection(db, "students"), newObj);
      alert("University added successfully!");
      fetchUniversities(); // Refresh the list
    } catch (error) {
      console.error("Error adding university:", error);
    }
  };
  useEffect(() => {
    fetchUniversities();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={fetchUniversityById}>Search</button>
      <button onClick={addUniversity} style={{ marginLeft: "10px" }}>
        Add University
      </button>
      <h1>University List</h1>
      {universities.length > 0 ? (
        <ul>
          {universities.map((uni) => (
            <li key={uni.id}>
              <strong>{uni.name}</strong> - {uni.location}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading universities...</p>
      )}
    </div>
  );
};

export default SampleData;
