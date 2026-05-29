"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});


  export default function MapPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

    const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      
      
      <Map />
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          display: "flex",
          gap: "10px",
        }}
      >
        <Link href="/upload">
          <button style={btnStyle}>
            ➕ Upload
          </button>
        </Link>
         <button
          onClick={handleLogout}
          style={btnStyle}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

const btnStyle = {
  background: "#111",
  color: "white",
  border: "1px solid #333",
  padding: "10px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
};