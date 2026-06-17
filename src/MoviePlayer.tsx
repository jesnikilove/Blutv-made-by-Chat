export default function MoviePlayer() {
  return (
    <div style={{ color: "white" }}>
      <h1>Movie Player</h1>

      <div
        style={{
          height: "600px",
          background: "#000",
          borderRadius: "20px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "36px",
          fontWeight: "bold"
        }}
      >
        ▶ MOVIE PLAYER
      </div>

      <div
        style={{
          marginTop: "20px",
          background: "#111827",
          borderRadius: "20px",
          padding: "20px"
        }}
      >
        Now Playing: Top Gun Maverick
      </div>
    </div>
  );
}
