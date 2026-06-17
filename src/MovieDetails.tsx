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
          padding: 30,
          alignItems: "start"
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

        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontSize: "42px",
              lineHeight: "1.1",
              margin: 0,
              marginBottom: 15,
              wordBreak: "break-word",
              overflowWrap: "anywhere"
            }}
          >
            {movie.name}
          </h1>

          <div
            style={{
              color:"#aaa",
              marginBottom:20
            }}
          >
            {movie.year} • {movie.genre}
          </div>

          <div style={{ marginBottom:15 }}>
            ⭐ {movie.rating}
          </div>

          <div style={{ marginBottom:15 }}>
            <strong>Cast:</strong> {movie.cast}
          </div>

          <p
            style={{
              lineHeight:1.8,
              maxWidth:"900px"
            }}
          >
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
