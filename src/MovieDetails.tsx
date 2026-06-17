export default function MovieDetails({
  movie,
  onPlay,
  onFavorite,
  onSelectMovie
}: any) {
  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "30px",
          background: "#111827",
          borderRadius: "24px",
          padding: "30px"
        }}
      >
        <div
          style={{
            height: "450px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg,#7d4dff,#2d8cff)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          {movie}
        </div>

        <div>
          <h1
            style={{
              fontSize: "clamp(32px,5vw,48px)",
              lineHeight: "1.1",
              marginBottom: "10px"
            }}
          >
            {movie}
          </h1>

          <div
            style={{
              color: "#bbb",
              marginBottom: "20px"
            }}
          >
            Action • HD • BluTV
          </div>

          <p
            style={{
              color: "#ddd",
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "700px"
            }}
          >
            Stream {movie} instantly on BluTV.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px"
            }}
          >
            <button
              onClick={onPlay}
              style={{
                padding: "14px 30px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ▶ Play
            </button>

            <button
              onClick={onFavorite}
              style={{
                padding: "14px 30px",
                borderRadius: "12px",
                border: "none",
                background: "#222",
                color: "white",
                cursor: "pointer"
              }}
            >
              ⭐ Favorite
            </button>

            <button
              onClick={onPlay}
              style={{
                padding: "14px 30px",
                borderRadius: "12px",
                border: "none",
                background: "#333",
                color: "white",
                cursor: "pointer"
              }}
            >
              Trailer
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "35px" }}>
        <h2>Similar Movies</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto"
          }}
        >
          {[
            "Mission Impossible",
            "John Wick",
            "The Equalizer",
            "Fast X",
            "The Batman",
            "Avatar"
          ].map((item) => (
            <div
              key={item}
              onClick={() => onSelectMovie(item)}
              style={{
                minWidth: "220px",
                height: "320px",
                borderRadius: "18px",
                padding: "20px",
                display: "flex",
                alignItems: "end",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg,#111827,#7d4dff,#2d8cff)"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
