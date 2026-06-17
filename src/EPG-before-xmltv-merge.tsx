import { useEffect, useState } from "react";
import { getActiveProvider } from "./store/providerStore";
import {
  getLiveStreams,
  getXmltvGuide,
  buildStreamUrl
} from "./services/xtream";
import ChannelPlayer from "./ChannelPlayer";
import ProgramDetails from "./ProgramDetails";

export default function EPG() {
  const [channels, setChannels] = useState<any[]>([]);
  const [guideData, setGuideData] = useState<Record<string, any[]>>({});
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer] = useState(false);
  const [showDetails] = useState(false);

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

        const xmltv = await getXmltvGuide(
  provider.server || "",
  provider.username || "",
  provider.password || ""
);

const programmes = Array.isArray(xmltv?.tv?.programme)
  ? xmltv.tv.programme
  : xmltv?.tv?.programme
  ? [xmltv.tv.programme]
  : [];

const guideMap: Record<string, any[]> = {};

programmes.forEach((p: any) => {
  const channelId = String(p.channel || "").trim();
  if (!channelId) return;

  const rawTitle =
    typeof p.title === "string"
      ? p.title
      : p.title?.["#text"] || "";

  const rawDesc =
    typeof p.desc === "string"
      ? p.desc
      : p.desc?.["#text"] || "";

  if (!rawTitle || rawTitle.includes("No EPG")) {
    return;
  }

  if (!guideMap[channelId]) {
    guideMap[channelId] = [];
  }

  guideMap[channelId].push({
    id: p.start_timestamp || `${channelId}-${p.start}`,
    start: p.start,
    stop: p.stop,
    title: rawTitle,
    description: rawDesc
  });
});

const usChannels = streamData
  .filter((c: any) => c.epg_channel_id)
  .filter((c: any) => {
    const id = String(c.epg_channel_id || "");
    return (
      /\.us$/i.test(id) ||
      /^US:/i.test(id) ||
      /^US /i.test(id)
    );
  })
  .filter(
    (c: any) =>
      (guideMap[c.epg_channel_id] || []).length > 0
  )
  .sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );

setChannels(usChannels);

if (usChannels.length) {
  setSelectedChannel(usChannels[0]);
}

setGuideData(guideMap);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const currentPrograms =
    selectedChannel
      ? guideData[selectedChannel.epg_channel_id] || []
      : [];

  const currentProgram = currentPrograms[0];

  const currentTitle =
    currentProgram?.title || "No Guide Data";

  const currentDescription =
    currentProgram?.description || "";

  const timeline =
    channels.length && guideData[channels[0].epg_channel_id]
      ? (guideData[channels[0].epg_channel_id] || [])
          .slice(0, 8)
          .map((item: any) =>
            new Date(
              item.start.replace(" ", "T")
            ).toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit"
            })
          )
      : [];

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
    return <div style={{ color: "white" }}>Loading Guide...</div>;
  }

  return (
    <div style={{ color: "white", height: "100vh" }}>
      

      <div
        style={{
          overflow: "auto",
          height: "100vh"
        }}
      >
        <div
          style={{
            minWidth: "2200px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "280px repeat(8,minmax(220px,1fr))",
              gap: 12,
              position: "sticky",
              top: 0,
              zIndex: 100,
              background: "#0b1220",
              paddingBottom: 10
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

            {timeline.map((time, index) => (
              <div
                key={index}
                style={{
                  background: "#1f2937",
                  padding: 15,
                  borderRadius: 12,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                {time}
              </div>
            ))}
          </div>

          {channels.map(channel => (
            <div
              key={channel.stream_id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "280px repeat(8,minmax(220px,1fr))",
                gap: 12,
                marginTop: 8
              }}
            >
              <div
                onClick={() => setSelectedChannel(channel)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: 12,
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
                    fontSize:16,
                    fontWeight: "bold"
                  }}
                >
                  {channel.name}
                </div>
              </div>

              {((guideData[channel.epg_channel_id] || []).length === 0) ? Array.from({length:8}).map((_,idx)=>(<div key={idx} style={{background:"#111827",borderRadius:12,padding:12,minHeight:140,display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",fontWeight:"bold"}}>No Guide Data</div>)) : (guideData[channel.stream_id] || []).slice(0,8).map((item: any, idx: number) => (
                  <div
                    key={item.id || idx}
                    style={{
                      background: "#111827",
                      borderRadius: 12,
                      padding: 12,
                      minHeight:140
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize:16,
                        lineHeight: 1.4
                      }}
                    >
                      {item.title}
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
