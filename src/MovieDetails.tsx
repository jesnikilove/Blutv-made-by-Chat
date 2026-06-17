export default function MovieDetails({
  movie,
  onPlay,
  onFavorite
}: any) {
  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 30,
          background: "#111827",
          borderRadius: 24,
          padding: 30
        }}
      >
        <img
          src={movie.stream_icon}
          alt={movie.name}
          style={{
            width: "100%",
            borderRadius: 18
          }}
        />

        <div>
          <h1>{movie.name}</h1>

          <div style={{ color:"#aaa", marginBottom:20 }}>
            {movie.year} • {movie.genre}
          </div>

          <div style={{ marginBottom:15 }}>
            ⭐ {movie.rating}
          </div>

          <div style={{ marginBottom:15 }}>
            <strong>Cast:</strong> {movie.cast}
          </div>

          <p style={{ lineHeight:1.7 }}>
            {movie.plot}
          </p>

          <div
            style={{
              display:"flex",
              gap:15,
              marginTop:25
            }}
          >
            <button onClick={onPlay}>
              ▶ Play Movie
            </button>

            <button onClick={onFavorite}>
              ⭐ Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
