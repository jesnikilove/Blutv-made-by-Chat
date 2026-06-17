export default function MoviePlayer({
  title = "",
  streamUrl = ""
}: {
  title?: string;
  streamUrl?: string;
}) {
  return (
    <div style={{ color: "white" }}>
      <h1>{title}</h1>

      <video
        controls
        autoPlay
        style={{
          width: "100%",
          maxHeight: "700px",
          background: "#000",
          borderRadius: "20px",
          marginTop: "20px"
        }}
        src={streamUrl}
      />

      <div
        style={{
          marginTop: "20px",
          background: "#111827",
          borderRadius: "20px",
          padding: "20px"
        }}
      >
        Now Playing: {title}
      </div>
    </div>
  );
}
