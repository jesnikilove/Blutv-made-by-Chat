import { useState } from "react";
import SeriesDetails from "./SeriesDetails";
import { addFavorite } from "./FavoritesStore";

export default function Series() {
  const [selectedShow, setSelectedShow] = useState("");

  const shows = [
    "Law & Order SVU",
    "Criminal Minds",
    "NCIS",
    "Blue Bloods",
    "Chicago Fire",
    "Chicago PD",
    "FBI",
    "Bones"
  ];

  if (selectedShow) {
    return (
      <div>
        <button
          onClick={() => setSelectedShow("")}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer"
          }}
        >
          ← Back to Series
        </button>

        <SeriesDetails
          show={selectedShow}
          onFavorite={() => {
            addFavorite(selectedShow,"Series");
            alert("Added To Favorite Series");
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ marginBottom: 20 }}>Series</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: 20
        }}
      >
        {shows.map((show) => (
          <div
            key={show}
            onClick={() => setSelectedShow(show)}
            style={{
              height: 320,
              borderRadius: 20,
              background:
                "linear-gradient(135deg,#17172b,#7d4dff,#2d8cff)",
              padding: 20,
              display: "flex",
              alignItems: "end",
              fontWeight: "bold",
              fontSize: 20,
              cursor: "pointer"
            }}
          >
            {show}
          </div>
        ))}
      </div>
    </div>
  );
}
