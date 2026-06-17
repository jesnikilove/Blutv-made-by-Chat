import { useEffect } from "react";
import { getActiveProvider } from "./store/providerStore";
import {
  getLiveStreams,
  getShortEpg
} from "./services/xtream";

export default function TestEpg() {
  useEffect(() => {
    async function run() {
      const provider = getActiveProvider();

      if (!provider) return;

      const channels = await getLiveStreams(
        provider.server || "",
        provider.username || "",
        provider.password || ""
      );

      const firstFive = channels.slice(0,5);

      for (const channel of firstFive) {
        const epg = await getShortEpg(
          provider.server || "",
          provider.username || "",
          provider.password || "",
          channel.stream_id
        );

        console.log(
          channel.name,
          epg?.epg_listings?.length || 0
        );
      }
    }

    run();
  }, []);

  return <div style={{color:"white"}}>Testing...</div>;
}
