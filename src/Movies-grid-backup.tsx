import { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import MoviePlayer from "./MoviePlayer";
import { addFavorite } from "./FavoritesStore";
import { getActiveProvider } from "./store/providerStore";
import {
  getVodStreams,
  buildMovieUrl
} from "./services/xtream";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const provider = getActiveProvider();

        if (!provider) return;

        const data = await getVodStreams(
          provider.server || "",
          provider.username || "",
          provider.password || ""
        );

        setMovies(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading Movies...
      </div>
    );
  }

  if (showPlayer && selectedMovie) {
    const provider = getActiveProvider();

    return (
      <div>
        <button
          onClick={() => setShowPlayer(false)}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none"
          }}
        >
          ← Back To Details
        </button>

        <MoviePlayer
          title={selectedMovie.name}
          streamUrl={buildMovieUrl(
            provider?.server || "",
            provider?.username || "",
            provider?.password || "",
            selectedMovie.stream_id,
            selectedMovie.container_extension
          )}
        />
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div>
        <button
          onClick={() => setSelectedMovie(null)}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none"
          }}
        >
          ← Back To Movies
        </button>

        <MovieDetails
          movie={selectedMovie}
          onPlay={() => setShowPlayer(true)}
          onFavorite={() => {
            addFavorite(selectedMovie.name, "Movie");
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
          gap: 20,
          marginTop: 20
        }}
      >
        {movies.map(movie => (
          <div
            key={movie.stream_id}
            onClick={() => setSelectedMovie(movie)}
            style={{
              cursor: "pointer"
            }}
          >
            <img
              src={movie.stream_icon}
              alt={movie.name}
              style={{
                width: "100%",
                height: 320,
                objectFit: "cover",
                borderRadius: 18
              }}
            />

            <div
              style={{
                marginTop: 10,
                fontWeight: "bold"
              }}
            >
              {movie.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
