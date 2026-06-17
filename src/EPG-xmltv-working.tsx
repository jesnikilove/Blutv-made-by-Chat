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

          if (
            !rawTitle ||
            rawTitle.includes("No EPG")
          ) {
            return;
          }

          if (!guideMap[channelId]) {
            guideMap[channelId] = [];
          }

          guideMap[channelId].push({
            id:
              p.start_timestamp ||
              `${channelId}-${p.start}`,
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

        console.log("FIRST_CHANNEL",usChannels[0]);
console.log("FIRST_PROGRAMS", guideMap[usChannels[0]?.epg_channel_id]?.slice(0,3));
console.log("FIRST_TITLE", guideMap[usChannels[0]?.epg_channel_id]?.[0]?.title);
setChannels(usChannels);

        if (usChannels.length) {
          setSelectedChannel(usChannels[0]);
        }        setGuideData(guideMap);

        console.log(
          "EPG CHANNELS:",
          usChannels.length
        );
      } catch (err) {
        console.error(err);
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
  <div style={{color:"white",height:"100vh",overflow:"auto",padding:12}}>
    <div style={{display:"grid",gridTemplateColumns:"300px repeat(8,minmax(220px,1fr))",gap:12,position:"sticky",top:0,background:"#0b1220",zIndex:10,paddingBottom:12}}>
      <div style={{background:"#7d4dff",padding:12,borderRadius:12,fontWeight:"bold",textAlign:"center"}}>CHANNEL</div>
      {[1,2,3,4,5,6,7,8].map(n=>(<div key={n} style={{background:"#1f2937",padding:12,borderRadius:12,fontWeight:"bold",textAlign:"center"}}>PROGRAM {n}</div>))}
    </div>

    {channels.map(channel=>{
      const programs=guideData[channel.epg_channel_id]||[];

      return (
        <div key={channel.stream_id} style={{display:"grid",gridTemplateColumns:"300px repeat(8,minmax(220px,1fr))",gap:12,marginTop:12}}>
          <div style={{background:"#111827",padding:12,borderRadius:12,fontWeight:"bold"}}>
            {channel.name}
          </div>

          {Array.from({length:8}).map((_,idx)=>{
            const p=programs[idx];

            return (
              <div key={`-`} style={{background:"#111827",padding:12,borderRadius:12,minHeight:120}}>
                {p ? p.title : "-"}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);