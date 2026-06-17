import { useState } from "react";
import MovieDetails from "./MovieDetails";
import MoviePlayer from "./MoviePlayer";
import { addFavorite } from "./FavoritesStore";

export default function Movies() {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const movies = [
    "Top Gun Maverick",
    "Avatar",
    "John Wick",
    "The Equalizer",
    "Fast X",
    "The Batman",
    "Jurassic World",
    "Mission Impossible"
  ];

  if (showPlayer) {
    return (
      <div>
        <button
          onClick={() => setShowPlayer(false)}
          style={{
            marginBottom: "20px",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer"
          }}
        >
          ← Back To Details
        </button>

        <MoviePlayer />
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        <button
          onClick={() => setSelectedMovie("")}
          style={{
            marginBottom: "20px",
            padding: "12px 20px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer"
          }}
        >
          ← Back to Movies
        </button>

        <MovieDetails
          movie={selectedMovie}
          onPlay={() => setShowPlayer(true)}
          onFavorite={() => {
            addFavorite(selectedMovie,"Movie");
            alert("Added To Favorite Movies");
          }}
          onSelectMovie={setSelectedMovie}
        />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>🎬 Movies</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {movies.map(movie => (
          <div
            key={movie}
            onClick={() => setSelectedMovie(movie)}
            style={{
              height: "320px",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              alignItems: "end",
              cursor: "pointer",
              background:
                "linear-gradient(135deg,#111827,#7d4dff,#2d8cff)",
              fontWeight: "bold"
            }}
          >
            {movie}
          </div>
        ))}
      </div>
    </div>
  );
}
