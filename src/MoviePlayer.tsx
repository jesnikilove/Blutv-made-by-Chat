import { useEffect, useRef } from "react";

export default function MoviePlayer({
  title = "",
  streamUrl = ""
}: {
  title?: string;
  streamUrl?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.play().catch(() => {});

    const goFullscreen = async () => {
      try {
        if (document.fullscreenElement) return;

        await video.requestFullscreen();
      } catch {}
    };

    video.addEventListener("loadedmetadata", goFullscreen);

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        goFullscreen
      );
    };
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1>{title}</h1>

      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
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
