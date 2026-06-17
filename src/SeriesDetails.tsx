import { useEffect, useState } from "react";
import { getActiveProvider } from "./store/providerStore";
import { getSeriesInfo } from "./services/xtream";

export default function SeriesDetails({
  show,
  onFavorite
}: any) {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    async function loadSeriesInfo() {
      try {
        const provider = getActiveProvider();

        if (!provider || !show?.series_id) return;

        const data = await getSeriesInfo(
          provider.server || "",
          provider.username || "",
          provider.password || "",
          show.series_id
        );

        console.log("SERIES_INFO",data);
        setInfo(data);

        const firstSeason =
          Object.keys(data?.episodes || {})[0];

        if (firstSeason) {
          setSelectedSeason(firstSeason);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSeriesInfo();
  }, [show]);

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading Series...
      </div>
    );
  }

  const seasons = info?.episodes
    ? Object.keys(info.episodes)
    : [];

  const selectedSeasonEpisodes =
    info?.episodes?.[selectedSeason] || [];

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 30,
          background: "#111827",
          borderRadius: 24,
          padding: 30
        }}
      >
        <img
          src={show?.cover || show?.stream_icon}
          alt={show?.name}
          style={{
            width: "100%",
            borderRadius: 18
          }}
        />

        <div>
          <h1>{show?.name}</h1>

          <div
            style={{
              color: "#aaa",
              marginBottom: 15
            }}
          >
            {show?.genre}
          </div>

          <button onClick={onFavorite}>
            ⭐ Favorite Series
          </button>

          <p
            style={{
              marginTop: 20,
              lineHeight: 1.8
            }}
          >
            {info?.info?.plot || show?.plot}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>Episodes</h2>

        <select
          value={selectedSeason}
          onChange={(e) =>
            setSelectedSeason(e.target.value)
          }
          style={{
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
            minWidth: 220
          }}
        >
          {seasons.map((season) => (
            <option
              key={season}
              value={season}
            >
              Season {season}
            </option>
          ))}
        </select>

        <div
          style={{
            background: "#111827",
            borderRadius: 16,
            maxHeight: "600px",
            overflowY: "auto"
          }}
        >
          {selectedSeasonEpisodes.map(
            (ep: any) => (
              <div
                key={ep.id}
                style={{
                  padding: 15,
                  borderBottom: "1px solid #222"
                }}
              >
                {ep.title}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
