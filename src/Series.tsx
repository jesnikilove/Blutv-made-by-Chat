import { useEffect, useState } from "react";
import SeriesDetails from "./SeriesDetails";
import { addFavorite } from "./FavoritesStore";
import { getActiveProvider } from "./store/providerStore";
import { getSeries } from "./services/xtream";

export default function Series() {
  const [series, setSeries] = useState<any[]>([]);
  const [selectedShow, setSelectedShow] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSeries() {
      try {
        const provider = getActiveProvider();

        if (!provider) return;

        const data = await getSeries(
          provider.server || "",
          provider.username || "",
          provider.password || ""
        );

        setSeries(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSeries();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading Series...
      </div>
    );
  }

  if (selectedShow) {
    return (
      <div>
        <button
          onClick={() => setSelectedShow(null)}
          style={{
            marginBottom: 20,
            padding: "12px 20px",
            borderRadius: 12,
            border: "none"
          }}
        >
          ← Back To Series
        </button>

        <SeriesDetails
          show={selectedShow}
          onFavorite={() => {
            addFavorite(
              selectedShow.name,
              "Series"
            );

            alert(
              "Added To Favorite Series"
            );
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <h1>📺 Series</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(160px,1fr))",
          gap: 16,
          marginTop: 20
        }}
      >
        {series.map(show => (
          <div
            key={`${show.series_id}-${show.name}`}
            onClick={() =>
              setSelectedShow(show)
            }
            style={{
              cursor: "pointer"
            }}
          >
            {show.cover ? (
              <img
                src={show.cover}
                alt={show.name}
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 12
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 12,
                  background: "#1f2937"
                }}
              />
            )}

            <div
              style={{
                marginTop: 8,
                fontWeight: "bold",
                fontSize: 14
              }}
            >
              {show.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
