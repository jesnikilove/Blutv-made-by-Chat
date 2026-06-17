import { useEffect, useState } from "react";
import ChannelPlayer from "./ChannelPlayer";
import { addFavorite } from "./FavoritesStore";
import { getActiveProvider } from "./store/providerStore";
import { getLiveStreams, buildStreamUrl } from "./services/xtream";

export default function LiveTV() {
  const [channel, setChannel] = useState<any>(null);
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChannels() {
      try {
        const provider = getActiveProvider();

        if (!provider) return;

        const streams = await getLiveStreams(
          provider.server || "",
          provider.username || "",
          provider.password || ""
        );

        setChannels(streams.slice(0, 200));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadChannels();
  }, []);

  if (channel) {
    return (
      <div>
        <button
          onClick={() => setChannel(null)}
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
            addFavorite(
              channel.name,
              "Channel"
            );
            alert("Added To Favorite Channels");
          }}
          style={{
            marginBottom:20,
            marginLeft:10,
            padding:"12px 20px",
            borderRadius:12,
            border:"none"
          }}
        >
          ⭐ Favorite Channel
        </button>
<ChannelPlayer
channel={channel.name}
streamUrl={buildStreamUrl(
getActiveProvider()?.server || "",
getActiveProvider()?.username || "",
getActiveProvider()?.password || "",
channel.stream_id
)}
/>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{color:"white"}}>
        Loading Channels...
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>Live TV</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
          marginTop: 20
        }}
      >
        {channels.map((item) => (
          <div
            key={item.stream_id}
            onClick={() => {
console.log(item);
setChannel(item);
}}
            style={{
              background: "#111827",
              padding: 20,
              borderRadius: 20,
              cursor: "pointer"
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
