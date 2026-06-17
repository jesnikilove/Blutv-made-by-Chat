export default function EpisodePlayer() {
  return (
    <div style={{ color: "white" }}>
      <h1>Breaking Bad - S01E01</h1>

      <div
        style={{
          height: "500px",
          marginTop: "20px",
          borderRadius: "20px",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "32px",
          fontWeight: "bold"
        }}
      >
        ▶ VIDEO PLAYER
      </div>

      <div
        style={{
          marginTop: "20px",
          background: "#111827",
          padding: "20px",
          borderRadius: "20px"
        }}
      >
        <h2>Episode Information</h2>

        <p>
          Walter White, a chemistry teacher diagnosed
          with cancer, begins making life-changing
          decisions.
        </p>
      </div>
    </div>
  );
}
