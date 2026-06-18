import { useEffect, useState } from "react";
import ChannelPlayer from "./ChannelPlayer";
import { getActiveProvider } from "./store/providerStore";
import { getLiveStreams, buildStreamUrl } from "./services/xtream";

export default function CategoryView({
  title
}: {
  title: string;
}) {
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

        let filtered = streams;

        if (title === "Prime Crime") {
          const keywords = [
            "LAW",
            "ORDER",
            "SVU",
            "CSI",
            "NCIS",
            "CRIMINAL",
            "MINDS",
            "HAWAII",
            "FBI",
            "BLUE BLOODS",
            "BONES",
            "CASTLE",
            "MONK",
            "PSYCH",
            "COLD CASE",
            "MAJOR CRIMES",
            "ELEMENTARY",
            "CRIME"
          ];

          filtered = streams.filter((c: any) =>
            keywords.some((k) =>
              String(c.name || "")
                .toUpperCase()
                .includes(k)
            )
          );
}

        if (title === "Women's Favorites") {
          const keywords = [
            "HALLMARK",
            "LIFETIME",
            "ROMANCE",
            "LOVE",
            "HEART",
            "WEDDING",
            "BRIDE",
            "FAMILY",
            "HOME",
            "COOKING",
            "FOOD",
            "HGTV",
            "MAGNOLIA",
            "GREAT AMERICAN",
            "UPTV",
            "DRAMA",
            "SOAP"
          ];

          filtered = streams.filter((c: any) =>
            keywords.some((k) =>
              String(c.name || "")
                .toUpperCase()
                .includes(k)
            )
          );
        }

        setChannels(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadChannels();
  }, [title]);

  if (channel) {
    return (
      <ChannelPlayer
        channel={channel.name}
        streamUrl={buildStreamUrl(
          getActiveProvider()?.server || "",
          getActiveProvider()?.username || "",
          getActiveProvider()?.password || "",
          channel.stream_id
        )}
      />
    );
  }

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading {title}...
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>{title}</h1>

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
            onClick={() => setChannel(item)}
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