"use client";
import React, { useEffect, useState } from "react";
import ButtonField from "../common/ButtonField";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

function page() {
  const [count, setCount] = useState(0);
  const docId = "clickCounter";
  useEffect(() => {
    const fetchCount = async () => {
      const docRef = doc(db, "active_users", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCount(docSnap.data().count);
      } else {
        // Initialize count in Firestore if it doesn't exist
        await setDoc(docRef, { count: 0 });
        setCount(0);
      }
    };

    fetchCount();
  }, []);
  async function add() {
    const docRef = doc(db, "active_users", docId); // Reference to the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, increment the count
      await updateDoc(docRef, {
        count: increment(1), // Increments count by 1
      });
      setCount((prev) => prev + 1); // Update local state
    } else {
      // If the document doesn't exist, create it with count = 1
      await setDoc(docRef, { count: 1 });
    }
  }
  async function remove() {
    const docRef = doc(db, "active_users", docId);
    await updateDoc(docRef, { count: increment(-1) });

    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Mobile active_users</h1>
      <h3 className="mt-10">User Count - {count}</h3>
      <div className="flex items-center mt-10 gap-10">
        <ButtonField text="Add 1" handleClick={add} />
        <ButtonField text="remove 1" handleClick={remove} />
      </div>
    </div>
  );
}

export default page;
