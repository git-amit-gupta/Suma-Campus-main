"use client";
import ReExt from "@sencha/reext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import './login/login.css'
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </div>
  );
}
