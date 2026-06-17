export default function HomeScreen() {
  const navItems = [
    "🏠 Home",
    "📺 Live TV",
    "🎬 Movies",
    "📚 Series",
    "⭐ Favorites",
    "🕵 Prime Crime",
    "👩 Women's Favorites",
    "🏈 Sports",
    "🧒 Kids",
    "🌎 International",
    "⚙ Settings",
  ];

  const crime = [
    "Law & Order SVU",
    "Criminal Minds",
    "CSI",
    "NCIS",
    "Blue Bloods",
    "Bones",
  ];

  const women = [
    "Lifetime",
    "LMN",
    "Hallmark",
    "Oxygen",
    "TLC",
    "HGTV",
  ];

  const sports = [
    "NFL",
    "NBA",
    "MLB",
    "NHL",
    "ESPN",
    "College Football",
  ];

  const Row = ({ title, items }: any) => (
    <div style={{ marginBottom: 30 }}>
      <h2>{title}</h2>

      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
        }}
      >
        {items.map((item: string) => (
          <div
            key={item}
            style={{
              minWidth: 220,
              height: 280,
              borderRadius: 18,
              background:
                "linear-gradient(135deg,#17172b,#7d4dff,#2d8cff)",
              display: "flex",
              alignItems: "end",
              padding: 18,
              fontWeight: "bold",
              boxShadow: "0 0 20px rgba(0,0,0,.35)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#05010d",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 260,
          background: "#0f0f1c",
          padding: 25,
          borderRight: "1px solid #222",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: "bold",
            marginBottom: 35,
            color: "#8ec5ff",
          }}
        >
          BluTV
        </div>

        {navItems.map((item) => (
          <div
            key={item}
            style={{
              padding: 14,
              borderRadius: 12,
              marginBottom: 10,
              background:
                item === "🏠 Home"
                  ? "linear-gradient(90deg,#7d4dff,#ff4fd8)"
                  : "transparent",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          padding: 25,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: 320,
            borderRadius: 24,
            padding: 35,
            background:
              "linear-gradient(135deg,#1f1045,#7d4dff,#2d8cff)",
            marginBottom: 35,
          }}
        >
          <div style={{ color: "#ddd" }}>
            FEATURED TONIGHT
          </div>

          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              marginTop: 15,
            }}
          >
            LAW & ORDER SVU
          </div>

          <div
            style={{
              maxWidth: 700,
              marginTop: 15,
              color: "#eee",
            }}
          >
            Stream your favorite live television,
            movies, crime dramas and premium
            entertainment.
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 25,
            }}
          >
            <button
              style={{
                padding: "14px 28px",
                borderRadius: 12,
                border: "none",
                fontWeight: "bold",
              }}
            >
              ▶ Watch Now
            </button>

            <button
              style={{
                padding: "14px 28px",
                borderRadius: 12,
                border: "none",
                background: "#00000055",
                color: "white",
              }}
            >
              More Info
            </button>
          </div>
        </div>

        <Row
          title="Prime Crime"
          items={crime}
        />

        <Row
          title="Women's Favorites"
          items={women}
        />

        <Row
          title="Sports Hub"
          items={sports}
        />

        <div style={{ marginTop: 40 }}>
          <h2>Live Now</h2>

          <div
            style={{
              background: "#111122",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {[
              "NBC — Law & Order SVU",
              "CBS — FBI",
              "FOX — MasterChef",
              "ESPN — NBA Basketball",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: 16,
                  borderBottom:
                    "1px solid #222",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}