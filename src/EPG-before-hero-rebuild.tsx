import { useEffect, useState } from "react";
import { getActiveProvider } from "./store/providerStore";
import {
  getLiveStreams,
  getShortEpg
} from "./services/xtream";

export default function EPG() {
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [epg, setEpg] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const provider = getActiveProvider();

        if (!provider) return;

        const data = await getLiveStreams(
          provider.server || "",
          provider.username || "",
          provider.password || ""
        );

        setChannels(data.slice(0, 200));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function loadEpg(channel: any) {
    setSelectedChannel(channel);

    const provider = getActiveProvider();

    if (!provider) return;

    const data = await getShortEpg(
      provider.server || "",
      provider.username || "",
      provider.password || "",
      channel.stream_id
    );

    setEpg(data?.epg_listings || []);
  }

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading EPG...
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>TV Guide</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 20
        }}
      >
        <div
          style={{
            maxHeight: "800px",
            overflowY: "auto",
            background: "#111827",
            borderRadius: 20,
            padding: 10
          }}
        >
          {channels.map(channel => (
            <div
              key={channel.stream_id}
              onClick={() => loadEpg(channel)}
              style={{
                padding: 12,
                cursor: "pointer",
                borderBottom: "1px solid #222"
              }}
            >
              {channel.name}
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          <h2>
            {selectedChannel?.name || "Select A Channel"}
          </h2>

          {epg.map((item: any) => (
            <div
              key={item.id}
              style={{
                padding: 15,
                borderBottom: "1px solid #222"
              }}
            >
              <div
                style={{
                  fontWeight: "bold"
                }}
              >
                {atob(item.title || "")}
              </div>

              <div
                style={{
                  color: "#aaa",
                  marginTop: 5
                }}
              >
                {item.start}
              </div>

              <div
                style={{
                  marginTop: 8
                }}
              >
                {atob(item.description || "")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
