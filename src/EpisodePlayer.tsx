import { useEffect, useRef } from "react";

export default function EpisodePlayer({
  title = "",
  streamUrl = ""
}: any) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.play().catch(() => {});

    const fullscreen = async () => {
      try {
        await video.requestFullscreen();
      } catch {}
    };

    video.addEventListener(
      "loadedmetadata",
      fullscreen
    );

    return () =>
      video.removeEventListener(
        "loadedmetadata",
        fullscreen
      );
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1
        style={{
          fontSize: "clamp(28px,4vw,52px)",
          lineHeight: 1.1,
          marginBottom: 20,
          wordBreak: "break-word",
          overflowWrap: "anywhere"
        }}
      >
        {title}
      </h1>

      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        src={streamUrl}
        style={{
          width: "100%",
          maxHeight: "80vh",
          background: "#000",
          borderRadius: "20px"
        }}
      />

      <div
        style={{
          marginTop: 20,
          background: "#111827",
          borderRadius: 16,
          padding: 20
        }}
      >
        Now Playing: {title}
      </div>
    </div>
  );
}
