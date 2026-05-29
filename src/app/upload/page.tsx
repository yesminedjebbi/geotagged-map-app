"use client";

import UploadForm from "@/components/UploadForm";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function UploadPage() {

   const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        router.push("/login");
      }
    }, [router]);
    
  return (
    <div style={{ padding: "40px" }}>
      
      <Link href="/map">
        <button>⬅ Back to map</button>
      </Link>

      <h1 style={{ marginTop: "20px" }}>Upload Photo</h1>

      <UploadForm />
    </div>
  );
}