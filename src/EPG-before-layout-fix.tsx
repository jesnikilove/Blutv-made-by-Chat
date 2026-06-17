import { useEffect, useState } from "react";
import { getActiveProvider } from "./store/providerStore";
import {
  getLiveStreams,
  getShortEpg,
  buildStreamUrl
} from "./services/xtream";
import ChannelPlayer from "./ChannelPlayer";
import EPGHero from "./EPGHero";
import ProgramDetails from "./ProgramDetails";
import { addFavorite } from "./FavoritesStore";

export default function EPG() {
  const [channels, setChannels] = useState<any[]>([]);
  const [guideData, setGuideData] = useState<Record<string, any[]>>({});
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    async function load() {
      const provider = getActiveProvider();

      if (!provider) return;

      try {
        const streamData = await getLiveStreams(
          provider.server || "",
          provider.username || "",
          provider.password || ""
        );

        const firstChannels = streamData;

        setChannels(firstChannels);

        if (firstChannels.length) {
          setSelectedChannel(firstChannels[0]);
        }

        const guideMap: Record<string, any[]> = {};

        await Promise.all(
          firstChannels.map(async (channel: any) => {
            try {
              const epg = await getShortEpg(
                provider.server || "",
                provider.username || "",
                provider.password || "",
                channel.stream_id
              );

              guideMap[channel.stream_id] =
                epg?.epg_listings || [];
            } catch {
              guideMap[channel.stream_id] = [];
            }
          })
        );

        setGuideData(guideMap);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const currentPrograms =
    selectedChannel
      ? guideData[selectedChannel.stream_id] || []
      : [];

  const currentProgram = currentPrograms[0];

  const currentTitle = currentProgram
    ? atob(currentProgram.title || "")
    : "No Guide Data";

  const currentDescription = currentProgram
    ? atob(currentProgram.description || "")
    : "";

  const timeline = ["NOW","NEXT","LATER","LATER+1","LATER+2"];

  if (showPlayer && selectedChannel) {
    return (
      <ChannelPlayer
        channel={selectedChannel.name}
        title={currentTitle}
        description={currentDescription}
        streamUrl={buildStreamUrl(
          getActiveProvider()?.server || "",
          getActiveProvider()?.username || "",
          getActiveProvider()?.password || "",
          selectedChannel.stream_id
        )}
      />
    );
  }

  if (showDetails && currentProgram) {
    return (
      <ProgramDetails
        channel={selectedChannel.name}
        title={currentTitle}
        start={currentProgram.start}
        end={currentProgram.stop}
        description={currentDescription}
      />
    );
  }

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading Guide...
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <EPGHero
        title={currentTitle}
        channel={selectedChannel?.name || ""}
        start={currentProgram?.start || ""}
        end={currentProgram?.stop || ""}
        description={currentDescription}
        onWatchLive={() => setShowPlayer(true)}
        onMoreInfo={() => setShowDetails(true)}
        onFavorite={() => {
          addFavorite(currentTitle, "Program");
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 12,
          height: "75vh",
          overflowY: "scroll"
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#1f1045,#7d4dff)",
            borderRadius: 12,
            padding: 15,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          CHANNELS
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap: 10
          }}
        >
          {timeline.map((time, index) => (
            <div
              key={index}
              style={{
                background: "#1f2937",
                padding: 12,
                borderRadius: 12,
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              {time}
            </div>
          ))}
        </div>

        <div
          style={{
            overflowY: "scroll"
          }}
        >
          {channels.map(channel => (
            <div
              key={channel.stream_id}
              onClick={() =>
                setSelectedChannel(channel)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 12,
                marginBottom: 8,
                borderRadius: 12,
                cursor: "pointer",
                background:
                  selectedChannel?.stream_id ===
                  channel.stream_id
                    ? "linear-gradient(135deg,#7d4dff,#2d8cff)"
                    : "#111827"
              }}
            >
              <img
                src={channel.stream_icon}
                alt=""
                style={{
                  width: 42,
                  height: 42,
                  objectFit: "contain",
                  background: "#fff",
                  borderRadius: 8
                }}
              />

              <div
                style={{
                  fontSize: 13,
                  fontWeight: "bold"
                }}
              >
                {channel.name}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            overflowY: "scroll"
          }}
        >
          {channels.map(channel => (
            <div
              key={channel.stream_id}
              style={{
                display: "grid",
                gridTemplateColumns:"repeat(4,1fr)",
                gap: 10,
                marginBottom: 8
              }}
            >
              {(guideData[channel.stream_id] || [])
                
                .map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#111827",
                      borderRadius: 12,
                      padding: 12,
                      minHeight: 90
                    }}
                  >
                    <div
                      style={{
                        color: "#8ec5ff",
                        fontSize: 12
                      }}
                    >
                      {item.start}
                    </div>

                    <div
                      style={{
                        marginTop: 8,
                        fontWeight: "bold",
                        fontSize: 13
                      }}
                    >
                      {atob(item.title || "")}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
