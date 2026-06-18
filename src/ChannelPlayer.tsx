import { useRef, useEffect, useState } from "react";

export default function ChannelPlayer({
  channel = "Channel",
  streamUrl = "",
  preview = false
}: {
  channel?: string;
  streamUrl?: string;
  preview?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
  if (!preview && videoRef.current) {
    const video = videoRef.current;

    const enterFullscreen = () => {
      video.requestFullscreen?.().catch(() => {});
    };

    video.addEventListener("loadedmetadata", enterFullscreen, {
      once: true
    });

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        enterFullscreen
      );
    };
  }
}, [preview, streamUrl]);
  return (
    <div style={{ color: "white" }}>
      {!preview && (
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
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls={!preview && paused}
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        style={{
          width: "100%",
          height: preview ? "260px" : "100%",
          background: "#000",
          borderRadius: preview ? "12px" : "20px",
          marginTop: preview ? "0" : "20px"
        }}
        src={streamUrl}
      />
    </div>
  );
}
