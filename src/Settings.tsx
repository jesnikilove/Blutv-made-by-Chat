import { useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("BluTV Dark");

  return (
    <div style={{ color: "white" }}>
      <h1>⚙ Settings</h1>

      <div
        style={{
          marginTop: 20,
          display: "grid",
          gap: 15
        }}
      >
        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          👤 Profile
          <div style={{ color: "#aaa", marginTop: 5 }}>
            Jessica
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          🎨 Theme

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => setTheme("BluTV Dark")}
              style={{
                marginRight: 10,
                padding: "10px 16px",
                borderRadius: 10,
                border: "none"
              }}
            >
              Dark
            </button>

            <button
              onClick={() => setTheme("BluTV Purple")}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "none"
              }}
            >
              Purple
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
            Current Theme: {theme}
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          ⭐ Favorites Manager
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          🔒 Parental Controls
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          ℹ About BluTV

          <div style={{ marginTop: 10, color: "#aaa" }}>
            Version 1.0
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20,
            cursor: "pointer"
          }}
          onClick={() => alert("Logout Coming Soon")}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}
