export default function EPGHero({
  title,
  channel,
  start,
  end,
  description,
  onWatchLive,
  onFavorite,
  onMoreInfo
}: {
  title: string;
  channel: string;
  start: string;
  end: string;
  description: string;
  onWatchLive?: () => void;
  onFavorite?: () => void;
  onMoreInfo?: () => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 30,
        background:
          "linear-gradient(135deg,#1f1045,#7d4dff,#2d8cff)",
        borderRadius: 24,
        padding: 30,
        marginBottom: 25
      }}
    >
      <div
        style={{
          height: 420,
          borderRadius: 20,
          background: "#00000040",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: "bold"
        }}
      >
        POSTER
      </div>

      <div>
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: 999,
            background: "#00000040",
            marginBottom: 15
          }}
        >
          {channel}
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(28px,4vw,64px)",
            lineHeight: 1,
            maxWidth: 700
          }}
        >
          {title}
        </h1>

        <div
          style={{
            marginTop: 12,
            fontWeight: "bold",
            fontSize: 18
          }}
        >
          {start} - {end}
        </div>

        <p
          style={{
            marginTop: 20,
            lineHeight: 1.7,
            fontSize: 18,
            maxWidth: 900
          }}
        >
          {description}
        </p>

        <div
          style={{
            background:"#00000030",
            borderRadius:16,
            padding:16,
            marginTop:20,
            maxWidth:700
          }}
        >
          <div><strong>NOW:</strong> {title}</div>
          <div style={{marginTop:8}}><strong>NEXT:</strong> Coming Up Next</div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 25
          }}
        >
          <button
            onClick={onWatchLive}
            style={{
              padding: "14px 28px",
              border: "none",
              borderRadius: 12,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ▶ Watch Live
          </button>

          <button
            onClick={onFavorite}
            style={{
              padding: "14px 28px",
              border: "none",
              borderRadius: 12,
              background: "#00000040",
              color: "white",
              cursor: "pointer"
            }}
          >
            ⭐ Favorite
          </button>

          <button
            onClick={onMoreInfo}
            style={{
              padding: "14px 28px",
              border: "none",
              borderRadius: 12,
              background: "#00000040",
              color: "white",
              cursor: "pointer"
            }}
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
}
