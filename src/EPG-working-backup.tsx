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
  const [selectedChannel, setSelectedChannel] = useState<any>(null);
  const [epg, setEpg] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

        if (data?.length) {
          loadEpg(data[0]);
        }
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

  const currentProgram = epg?.[0];

  const currentTitle = currentProgram
    ? atob(currentProgram.title || "")
    : "No Guide Data";

  const currentDescription = currentProgram
    ? atob(currentProgram.description || "")
    : "";

  if (showPlayer && selectedChannel) {
    return (
      <div>
        <button
          onClick={() => setShowPlayer(false)}
          style={{
            marginBottom:20,
            padding:"12px 20px",
            borderRadius:12,
            border:"none"
          }}
        >
          ← Back To Guide
        </button>

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
      </div>
    );
  }

  if (showDetails && currentProgram) {
    return (
      <div>
        <button
          onClick={() => setShowDetails(false)}
          style={{
            marginBottom:20,
            padding:"12px 20px",
            borderRadius:12,
            border:"none"
          }}
        >
          ← Back
        </button>

        <ProgramDetails
          channel={selectedChannel?.name || ""}
          title={currentTitle}
          start={currentProgram.start || ""}
          end={currentProgram.stop || ""}
          description={currentDescription}
        />
      </div>
    );
  }

  if (loading) {
    return <div style={{color:"white"}}>Loading EPG...</div>;
  }

  return (
    <div style={{color:"white"}}>

      <EPGHero
        title={currentTitle}
        channel={selectedChannel?.name || ""}
        start={currentProgram?.start || ""}
        end={currentProgram?.stop || ""}
        description={currentDescription}
        onWatchLive={() => setShowPlayer(true)}
        onMoreInfo={() => setShowDetails(true)}
        onFavorite={() => {
          addFavorite(currentTitle,"Program");
          alert("Added To Favorites");
        }}
      />

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"320px 1fr",
          gap:20
        }}
      >
        <div
          style={{
            maxHeight:"700px",
            overflowY:"auto",
            background:"#111827",
            borderRadius:20,
            padding:10
          }}
        >
          {channels.map(channel => (
            <div
              key={channel.stream_id}
              onClick={() => loadEpg(channel)}
              style={{
                display:"flex",
                alignItems:"center",
                gap:10,
                padding:12,
                cursor:"pointer",
                borderBottom:"1px solid #222"
              }}
            >
              <img
                src={channel.stream_icon}
                alt=""
                style={{
                  width:40,
                  height:40,
                  objectFit:"contain"
                }}
              />

              <div>
                {channel.name}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background:"#111827",
            borderRadius:20,
            padding:20
          }}
        >
          <h2>
            {selectedChannel?.name}
          </h2>

          {epg.map((item:any) => (
            <div
              key={item.id}
              style={{
                padding:15,
                borderBottom:"1px solid #222"
              }}
            >
              <div
                style={{
                  fontWeight:"bold",
                  fontSize:18
                }}
              >
                {atob(item.title || "")}
              </div>

              <div
                style={{
                  color:"#8ec5ff",
                  marginTop:5
                }}
              >
                {item.start}
              </div>

              <div
                style={{
                  marginTop:8,
                  color:"#ccc"
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
