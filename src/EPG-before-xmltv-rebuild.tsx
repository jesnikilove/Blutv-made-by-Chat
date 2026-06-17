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

        const epgChannels = streamData.filter((c:any)=>c.epg_channel_id).filter((c:any)=>/.us0US:|USA|ABC|CBS|NBC|FOX|ESPN|NFL|NBA|MLB|NHL|CNN|MSNBC|NEWSMAX|A&E|AMC|HGTV|HISTORY|DISCOVERY/i.test(String(c.epg_channel_id)+" "+c.name)).sort((a:any,b:any)=>a.name.localeCompare(b.name));
        

        const guideMap: Record<string, any[]> = {};

        await Promise.all(
          epgChannels.map(async (channel: any) => {
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

        const sortedChannels = [...epgChannels].sort((a:any,b:any)=>{
          const aGuide=(guideMap[a.stream_id]||[]).length>0?0:1;
          const bGuide=(guideMap[b.stream_id]||[]).length>0?0:1;
          return aGuide-bGuide;
        });

        setChannels(sortedChannels);
        if(sortedChannels.length){
          setSelectedChannel(sortedChannels[0]);
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
      ? guideData[selectedChannel.stream_id] || []
      : [];

  const currentProgram = currentPrograms[0];

  const currentTitle = currentProgram
    ? atob(currentProgram.title || "")
    : "No Guide Data";

  const currentDescription = currentProgram
    ? atob(currentProgram.description || "")
    : "";

  const timeline =
    channels.length && guideData[channels[0].stream_id]
      ? (guideData[channels[0].stream_id] || [])
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

              {((guideData[channel.stream_id] || []).length === 0) ? Array.from({length:8}).map((_,idx)=>(<div key={idx} style={{background:"#111827",borderRadius:12,padding:12,minHeight:140,display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",fontWeight:"bold"}}>No Guide Data</div>)) : (guideData[channel.stream_id] || []).slice(0,8).map((item: any, idx: number) => (
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
