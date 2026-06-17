import { useState } from "react";
import ChannelPlayer from "./ChannelPlayer";
import { addFavorite } from "./FavoritesStore";

export default function LiveTV() {
  const [channel, setChannel] = useState("");

  const channels = [
    "ESPN HD",
    "FOX News",
    "CNN",
    "NBC",
    "CBS",
    "ABC",
    "TNT",
    "USA Network"
  ];

  if (channel) {
    return (
      <div>
        <button
          onClick={() => setChannel("")}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none"
          }}
        >
          ← Back to Channels
        </button>

        <button
          onClick={() => {
            addFavorite(channel,"Channel");
            alert("Added To Favorite Channels");
          }}
          style={{
            marginBottom:20,
            padding:"12px 20px",
            borderRadius:12,
            border:"none",
            cursor:"pointer"
          }}
        >
          ⭐ Favorite Channel
        </button>

        <ChannelPlayer channel={channel} />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>Live TV</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {channels.map((item) => (
          <div
            key={item}
            onClick={() => setChannel(item)}
            style={{
              background: "#111827",
              padding: 20,
              borderRadius: 20,
              cursor: "pointer"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
