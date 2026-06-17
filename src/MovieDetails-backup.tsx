export default function MovieDetails() {
  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "30px",
          background: "#111827",
          borderRadius: "24px",
          padding: "30px"
        }}
      >
        <div
          style={{
            height: "450px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg,#7d4dff,#2d8cff)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          TOP GUN
        </div>

        <div>
          <h1
            style={{
              fontSize: "clamp(32px,5vw,48px)",
              lineHeight: "1.1",
              marginBottom: "10px"
            }}
          >
            TOP GUN MAVERICK
          </h1>

          <div
            style={{
              color: "#bbb",
              marginBottom: "20px"
            }}
          >
            Action • 2022 • PG-13 • 2h 10m
          </div>

          <p
            style={{
              color: "#ddd",
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "700px"
            }}
          >
            After thirty years, Maverick is still pushing
            the envelope as a top naval aviator while
            training a new generation of elite pilots.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px"
            }}
          >
            <button
              style={{
                padding: "14px 30px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ▶ Play
            </button>

            <button
              style={{
                padding: "14px 30px",
                borderRadius: "12px",
                border: "none",
                background: "#222",
                color: "white",
                cursor: "pointer"
              }}
            >
              + Favorite
            </button>

            <button
              style={{
                padding: "14px 30px",
                borderRadius: "12px",
                border: "none",
                background: "#333",
                color: "white",
                cursor: "pointer"
              }}
            >
              Trailer
            </button>
          </div>

          <div style={{ marginTop: "35px" }}>
            <h3>Cast</h3>
            <p>Tom Cruise</p>
            <p>Miles Teller</p>
            <p>Jennifer Connelly</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "35px" }}>
        <h2>Similar Movies</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto"
          }}
        >
          {[
            "Mission Impossible",
            "John Wick",
            "The Equalizer",
            "Fast X",
            "The Batman"
          ].map((movie) => (
            <div
              key={movie}
              style={{
                minWidth: "220px",
                height: "320px",
                borderRadius: "18px",
                padding: "20px",
                display: "flex",
                alignItems: "end",
                background:
                  "linear-gradient(135deg,#111827,#7d4dff,#2d8cff)"
              }}
            >
              {movie}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
