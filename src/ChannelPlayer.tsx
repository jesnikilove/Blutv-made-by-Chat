export default function ChannelPlayer({
  channel = "Channel",
  streamUrl = "",
  title = "",
  description = ""
}: {
  channel?: string;
  streamUrl?: string;
  title?: string;
  description?: string;
}) {
  return (
    <div style={{ color: "white" }}>
      <h1
        style={{
          fontSize: "24px",
          lineHeight: "1.2",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          maxWidth: "100%"
        }}
      >
        {channel}
      </h1>

      <video
        controls
        autoPlay
        style={{
          width: "100%",
          maxHeight: "650px",
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
        <h2>Now Playing</h2>
        <p>{title || channel}</p>

        <h2>Description</h2>
        <p>{description || "Live IPTV Stream"}</p>
      </div>
    </div>
  );
}
