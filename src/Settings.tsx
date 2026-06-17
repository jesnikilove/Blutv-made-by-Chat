import { useEffect, useState } from "react";
import {
  getProviders,
  setActiveProvider
} from "./store/providerStore";
import {
  getBufferLevel,
  setBufferLevel,
  getReconnect,
  setReconnect
} from "./store/settingsStore";

export default function Settings() {
  const [providers, setProviders] = useState<any[]>([]);
  const [buffer, setBuffer] = useState("medium");
  const [reconnect, setReconnectState] = useState(false);

  useEffect(() => {
    setProviders(getProviders());
    setBuffer(getBufferLevel());
    setReconnectState(getReconnect());
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h1>⚙ Settings</h1>

      <div
        style={{
          display: "grid",
          gap: 15,
          marginTop: 20
        }}
      >
        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          <h2>📺 Providers</h2>

          {providers.length === 0 && (
            <div>No Providers Added Yet</div>
          )}

          {providers.map((provider) => (
            <div
              key={provider.id}
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 12,
                background: provider.active
                  ? "#1e3a8a"
                  : "#1f2937",
                cursor: "pointer"
              }}
              onClick={() => {
                setActiveProvider(provider.id);
                setProviders(getProviders());
              }}
            >
              {provider.name}
              {provider.active ? " ✅ ACTIVE" : ""}
            </div>
          ))}

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 15
            }}
          >
            <button
              onClick={() =>
                alert("Xtream Provider Screen Coming Next")
              }
            >
              + Xtream
            </button>

            <button
              onClick={() =>
                alert("M3U Provider Screen Coming Next")
              }
            >
              + M3U
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          <h2>🚀 Buffer Settings</h2>

          <div
            style={{
              display: "flex",
              gap: 10
            }}
          >
            {["small","medium","large"].map(level => (
              <button
                key={level}
                onClick={() => {
                  setBuffer(level);
                  setBufferLevel(level);
                }}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            Current: {buffer}
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          <h2>🔄 Auto Reconnect</h2>

          <button
            onClick={() => {
              const next = !reconnect;
              setReconnectState(next);
              setReconnect(next);
            }}
          >
            {reconnect ? "ON" : "OFF"}
          </button>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 20,
            padding: 20
          }}
        >
          <h2>ℹ About</h2>

          <div>StreamLine BluTV</div>
          <div>Version 1.0</div>
        </div>

        <div
          style={{
            background: "#7f1d1d",
            borderRadius: 20,
            padding: 20,
            cursor: "pointer"
          }}
          onClick={() => {
            localStorage.removeItem("blutv_session");
            location.reload();
          }}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}
