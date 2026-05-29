"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const upload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const res = await fetch("/api/photos/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    setMessage(res.ok ? "✅ Uploaded successfully" : "❌ Error");

    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{
          padding: "10px",
          background: "#000",
          border: "1px solid #333",
          borderRadius: "10px",
          color: "white",
        }}
      />

      <button
        onClick={upload}
        disabled={loading}
        style={{
          background: "#fff",
          color: "#000",
          padding: "10px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <p style={{ color: "#aaa", fontSize: "14px" }}>
          {message}
        </p>
      )}
    </div>
  );
}