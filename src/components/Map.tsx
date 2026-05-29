"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Photo = {
  id: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  aiDescription?: string;
};

type Comment = {
  id: string;
  text: string;
  user?: {
    email: string;
  };
};
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Map() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error("Error loading photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Load comments
  const loadComments = async (photoId: string) => {
    try {
      const res = await fetch(`/api/comments/${photoId}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {photos.map((photo) => {
        if (!photo.latitude || !photo.longitude) return null;

        return (
          <Marker
            key={photo.id}
            position={[photo.latitude, photo.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedPhoto(photo.id);
                setComments([]);
                loadComments(photo.id);
              },
            }}
          >
            <Popup>
              <div style={{ width: "240px" }}>
                
                
                <img
                  src={photo.imageUrl}
                  alt="photo"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />

                
                {photo.aiDescription && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      marginBottom: "8px",
                    }}
                  >
                    {photo.aiDescription}
                  </p>
                )}

                
                <div>
                  <h4 style={{ marginBottom: "5px" }}>Comments</h4>

                  {comments.length === 0 && (
                    <p style={{ fontSize: "12px" }}>
                      No comments yet
                    </p>
                  )}

                  {comments.map((c) => (
                    <p key={c.id} style={{ fontSize: "12px" }}>
                      💬 <strong>{c.user?.email || "User"}:</strong> {c.text}
                    </p>
                  ))}
                </div>

                <div style={{ marginTop: "8px" }}>
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    style={{
                      width: "100%",
                      padding: "6px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  />

                  <button
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      padding: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                      background: "#111",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                    }}
                    onClick={async () => {
                      if (!selectedPhoto || !newComment) return;

                      try {
                        await fetch("/api/comments", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                          body: JSON.stringify({
                            text: newComment,
                            photoId: selectedPhoto,
                          }),
                        });

                        setNewComment("");

                        if (selectedPhoto) {
                          loadComments(selectedPhoto);
                        }
                      } catch (err) {
                        console.error("Error posting comment:", err);
                      }
                    }}
                  >
                    Send
                  </button>
                </div>

              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}