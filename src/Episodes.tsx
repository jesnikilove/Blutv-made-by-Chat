import { useState } from "react";
import EpisodePlayer from "./EpisodePlayer";

export default function Episodes() {
  const [selectedEpisode, setSelectedEpisode] = useState("");

  const episodes = [
    "S01E01 - Pilot",
    "S01E02 - Cat's in the Bag",
    "S01E03 - ...And the Bag's in the River",
    "S01E04 - Cancer Man",
    "S01E05 - Gray Matter",
    "S01E06 - Crazy Handful of Nothin'",
    "S01E07 - A No-Rough-Stuff-Type Deal"
  ];

  if (selectedEpisode) {
    return (
      <div>
        <button
          onClick={() => setSelectedEpisode("")}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none"
          }}
        >
          ← Back to Episodes
        </button>

        <EpisodePlayer />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h2>Season 1 Episodes</h2>

      <div
        style={{
          marginTop: 20,
          background: "#111827",
          borderRadius: 20,
          overflow: "hidden"
        }}
      >
        {episodes.map((episode) => (
          <div
            key={episode}
            onClick={() => setSelectedEpisode(episode)}
            style={{
              padding: 20,
              borderBottom: "1px solid #222",
              cursor: "pointer"
            }}
          >
            {episode}
          </div>
        ))}
      </div>
    </div>
  );
}
