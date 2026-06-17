import { useState } from "react";
import Episodes from "./Episodes";

export default function SeriesDetails({
  show,
  onFavorite
}: any) {
  const [showEpisodes, setShowEpisodes] = useState(false);

  if (showEpisodes) {
    return (
      <div>
        <button
          onClick={() => setShowEpisodes(false)}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none"
          }}
        >
          ← Back to Seasons
        </button>

        <Episodes />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>{show}</h1>

      <div
        style={{
          display: "flex",
          gap: 15,
          marginBottom: 20
        }}
      >
        <button
          onClick={() => setShowEpisodes(true)}
          style={{
            padding: "14px 28px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer"
          }}
        >
          ▶ Resume Watching
        </button>

        <button
          onClick={onFavorite}
          style={{
            padding: "14px 28px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer"
          }}
        >
          ⭐ Favorite Series
        </button>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 20
        }}
      >
        <h2>Seasons</h2>

        <div
          onClick={() => setShowEpisodes(true)}
          style={{
            padding: 15,
            marginTop: 10,
            borderRadius: 12,
            background: "#1f2937",
            cursor: "pointer"
          }}
        >
          Season 1
        </div>

        <div style={{ padding: 15 }}>Season 2</div>
        <div style={{ padding: 15 }}>Season 3</div>
        <div style={{ padding: 15 }}>Season 4</div>
        <div style={{ padding: 15 }}>Season 5</div>
      </div>
    </div>
  );
}
