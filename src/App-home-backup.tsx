export default function App() {
  const primeCrime = [
    "Law & Order",
    "SVU",
    "Criminal Intent",
    "Criminal Minds",
    "CSI",
    "NCIS"
  ]

  const women = [
    "Lifetime",
    "LMN",
    "Hallmark",
    "Oxygen",
    "WE TV",
    "TLC"
  ]

  const sports = [
    "ESPN",
    "NFL",
    "NBA",
    "MLB",
    "NHL",
    "FOX Sports"
  ]

  return (
    <div
      style={{
        background: "#05010d",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          width: "260px",
          padding: "20px",
          borderRight: "1px solid #222"
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "30px",
            background:
              "linear-gradient(90deg,#ff4fd8,#7d4dff,#2d8cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          StreamLine BluTV
        </h1>

        <div style={{ lineHeight: "42px" }}>
          <div>🏠 Home</div>
          <div>📺 Live TV</div>
          <div>🎬 Movies</div>
          <div>📚 Series</div>
          <div>⭐ Favorites</div>
          <div>🕵️ Prime Crime</div>
          <div>👩 Women's Favorites</div>
          <div>🏈 Sports</div>
          <div>👶 Kids</div>
          <div>🌎 International</div>
          <div>⚙️ Settings</div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "25px",
          overflowY: "auto"
        }}
      >
        <div
          style={{
            height: "320px",
            borderRadius: "28px",
            padding: "40px",
            background:
              "linear-gradient(135deg,#541388,#2d8cff,#ff4fd8)"
          }}
        >
          <div
            style={{
              color: "#ffc83d",
              fontWeight: "bold",
              letterSpacing: "2px"
            }}
          >
            PRIME CRIME COLLECTION
          </div>

          <h1
            style={{
              fontSize: "70px",
              margin: "15px 0"
            }}
          >
            LAW & ORDER SVU
          </h1>

          <p
            style={{
              fontSize: "22px"
            }}
          >
            Criminal Minds • CSI • NCIS • FBI • Blue Bloods
          </p>

          <button
            style={{
              marginTop: "20px",
              background: "#ff4fd8",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "12px",
              fontWeight: "bold"
            }}
          >
            WATCH NOW
          </button>
        </div>

        <h2 style={{ marginTop: "35px" }}>
          Continue Watching
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Yellowstone", "SVU", "CSI Miami", "FBI"].map(item => (
            <div
              key={item}
              style={{
                width: "220px",
                height: "120px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#333,#111)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: "35px" }}>
          Prime Crime
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          {primeCrime.map(item => (
            <div
              key={item}
              style={{
                width: "220px",
                height: "120px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#7d4dff,#2d8cff)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold"
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: "35px" }}>
          Women's Favorites
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          {women.map(item => (
            <div
              key={item}
              style={{
                width: "220px",
                height: "120px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#ff4fd8,#ff9d00)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold"
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: "35px" }}>
          Sports
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          {sports.map(item => (
            <div
              key={item}
              style={{
                width: "220px",
                height: "120px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#ff9d00,#ffc83d)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#111",
                fontWeight: "bold"
              }}
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
