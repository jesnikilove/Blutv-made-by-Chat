import { favorites } from "./FavoritesStore";

export default function Favorites() {
  const movies = favorites.filter(
    f => f.category === "Movie"
  );

  const series = favorites.filter(
    f => f.category === "Series"
  );

  const channels = favorites.filter(
    f => f.category === "Channel"
  );

  const programs = favorites.filter(
    f => f.category === "Program"
  );

  const Row = ({
    title,
    items
  }: {
    title: string;
    items: { title: string }[];
  }) => {
    if (items.length === 0) return null;

    return (
      <div style={{ marginBottom: 35 }}>
        <h2>{title}</h2>

        <div
          style={{
            display: "flex",
            gap: 15,
            overflowX: "auto"
          }}
        >
          {items.map(item => (
            <div
              key={item.title}
              style={{
                minWidth: 240,
                height: 280,
                borderRadius: 20,
                padding: 20,
                display: "flex",
                alignItems: "end",
                fontWeight: "bold",
                background:
                  "linear-gradient(135deg,#111827,#7d4dff,#2d8cff)"
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg,#1f1045,#7d4dff,#2d8cff)",
          borderRadius: 24,
          padding: 30,
          marginBottom: 30
        }}
      >
        <h1>⭐ Favorites</h1>
        <p>Your saved content.</p>
      </div>

      {favorites.length === 0 && (
        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 30
          }}
        >
          No favorites saved yet.
        </div>
      )}

      <Row
        title="🎬 Favorite Movies"
        items={movies}
      />

      <Row
        title="📺 Favorite Series"
        items={series}
      />

      <Row
        title="📡 Favorite Channels"
        items={channels}
      />

      <Row
        title="⭐ Favorite Programs"
        items={programs}
      />
    </div>
  );
}
