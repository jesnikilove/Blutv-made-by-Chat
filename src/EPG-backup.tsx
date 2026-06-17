import { useEffect } from "react";
import { getActiveProvider } from "./store/providerStore";
import { getLiveStreams, getShortEpg } from "./services/xtream";

export default function EPG() {
  useEffect(() => {
    async function test() {
      const provider = getActiveProvider();

      if (!provider) return;

      const channels = await getLiveStreams(
        provider.server || "",
        provider.username || "",
        provider.password || ""
      );

      console.log("FIRST CHANNEL", channels?.[0]);

      if (channels?.[0]?.stream_id) {
        const epg = await getShortEpg(
          provider.server || "",
          provider.username || "",
          provider.password || "",
          channels[0].stream_id
        );

        console.log("EPG DATA", epg);
      }
    }

    test();
  }, []);

  return (
    <div style={{ color: "white" }}>
      Testing EPG...
      <br />
      Open Browser Console
    </div>
  );
}
