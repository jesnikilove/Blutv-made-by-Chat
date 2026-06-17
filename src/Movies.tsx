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
        />
      </div>
    );
  }

  const featured = movies[0];

  const genres = Array.from(
    new Set(
      movies.flatMap(movie =>
        (movie.genre || "")
          .split(",")
          .map((g: string) => g.trim())
          .filter(Boolean)
      )
    )
  );

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ marginBottom: 20 }}>
        🎬 Movies
      </h1>

      {featured && (
        <div
          onClick={() => setSelectedMovie(featured)}
          style={{
            height: 350,
            borderRadius: 24,
            overflow: "hidden",
            marginBottom: 40,
            cursor: "pointer",
            position: "relative"
          }}
        >
          <img
            src={featured.stream_icon}
            alt={featured.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 30,
              background:
                "linear-gradient(transparent,rgba(0,0,0,.9))"
            }}
          >
            <h2>{featured.name}</h2>
            <p>{featured.genre}</p>
          </div>
        </div>
      )}

      {genres.map((genre) => {
        const genreMovies = movies.filter(movie =>
          (movie.genre || "").includes(genre)
        );

        if (!genreMovies.length) return null;

        return (
          <div
            key={genre}
            style={{ marginBottom: 35 }}
          >
            <h2
              style={{
                marginBottom: 15
              }}
            >
              {genre}
            </h2>

            <div
              style={{
                display: "flex",
                gap: 12,
                overflowX: "auto",
                paddingBottom: 10
              }}
            >
              {genreMovies.map(movie => (
                <div
                  key={`${movie.stream_id}-${movie.name}`}
                  onClick={() =>
                    setSelectedMovie(movie)
                  }
                  style={{
                    minWidth: 150,
                    cursor: "pointer"
                  }}
                >
                  {movie.stream_icon ? (
                    <img
                      src={movie.stream_icon}
                      alt={movie.name}
                      style={{
                        width: 150,
                        height: 225,
                        objectFit: "cover",
                        borderRadius: 12
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 150,
                        height: 225,
                        borderRadius: 12,
                        background: "#1f2937"
                      }}
                    />
                  )}

                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 13,
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
      })}
    </div>
  );
}
