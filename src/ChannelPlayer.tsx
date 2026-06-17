export default function ChannelPlayer({
  channel = "ESPN HD",
  title = "NBA Basketball",
  description = "Live coverage of today's featured event."
}: {
  channel?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div style={{ color: "white" }}>
      <h1>{channel}</h1>

      <div
        style={{
          height: "500px",
          background: "#000",
          borderRadius: "20px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "32px",
          fontWeight: "bold"
        }}
      >
        ▶ LIVE TV PLAYER
      </div>

      <div
        style={{
          marginTop: "20px",
          background: "#111827",
          borderRadius: "20px",
          padding: "20px"
        }}
      >
        <h2>Now Playing</h2>
        <p>{title}</p>

        <h2>Description</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
