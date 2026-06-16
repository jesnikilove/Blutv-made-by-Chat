import { useState } from "react";
import HomeScreen from "./HomeScreen";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("xtream");

  if (loggedIn) {
    return <HomeScreen />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#7d4dff33,transparent 35%), radial-gradient(circle at bottom right,#ff4fd833,transparent 35%), linear-gradient(135deg,#05010d,#12052b,#1a1144,#05010d)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "560px",
          background: "rgba(20,20,40,.85)",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 0 60px rgba(125,77,255,.35)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div><div style={{fontSize:"42px",lineHeight:"52px",paddingTop:"12px",paddingBottom:"12px",fontWeight:"bold",background:"linear-gradient(90deg,#ff4fd8,#7d4dff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>StreamLine</div><div style={{fontSize:"72px",fontWeight:"bold",lineHeight:"72px",background:"linear-gradient(90deg,#2d8cff,#8ec5ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BluTV</div></div>

          <p
            style={{
              color: "#b0b0c0",
              marginTop: "12px"
            }}
          >
            Premium IPTV Experience
          </p>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "30px",
            marginBottom: "25px",
            background: "#151525",
            borderRadius: "14px",
            overflow: "hidden"
          }}
        >
          <button
            onClick={() => setMode("xtream")}
            style={{
              flex: 1,
              padding: "14px",
              border: "none",
              cursor: "pointer",
              color: "white",
              background:
                mode === "xtream"
                  ? "linear-gradient(90deg,#7d4dff,#ff4fd8)"
                  : "transparent"
            }}
          >
            Xtream Login
          </button>

          <button
            onClick={() => setMode("m3u")}
            style={{
              flex: 1,
              padding: "14px",
              border: "none",
              cursor: "pointer",
              color: "white",
              background:
                mode === "m3u"
                  ? "linear-gradient(90deg,#7d4dff,#ff4fd8)"
                  : "transparent"
            }}
          >
            M3U Login
          </button>
        </div>

        {mode === "xtream" ? (
          <>
            <input placeholder="Server URL" style={inputStyle} />
            <input placeholder="Username" style={inputStyle} />
            <input
              placeholder="Password"
              type="password"
              style={inputStyle}
            />
          </>
        ) : (
          <>
            <input placeholder="Playlist URL" style={inputStyle} />
            <input
              placeholder="EPG URL (Optional)"
              style={inputStyle}
            />
          </>
        )}

        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            color: "#ccc"
          }}
        >
          <label>
            <input type="checkbox" defaultChecked /> Remember Provider
          </label>

          <br />

          <label>
            <input type="checkbox" defaultChecked /> Auto Connect
          </label>
        </div>

        <button
          onClick={() => setLoggedIn(true)}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "16px",
            border: "none",
            borderRadius: "14px",
            background:
              "linear-gradient(90deg,#ff4fd8,#7d4dff,#2d8cff)",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          CONNECT
        </button>

        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#ffc83d" }}>
            Saved Providers
          </h3>

          <div style={profileStyle}>
            📺 Main IPTV
          </div>

          <div style={profileStyle}>
            🏈 Sports IPTV
          </div>

          <div style={profileStyle}>
            🎬 Backup IPTV
          </div>
        </div>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#888",
            fontSize: "12px"
          }}
        >
          Xtream • M3U • XMLTV • Version 1.0
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "12px",
  borderRadius: "14px",
  border: "1px solid #333",
  background: "#121222",
  color: "white",
  boxSizing: "border-box" as const
};

const profileStyle = {
  padding: "14px",
  marginTop: "10px",
  borderRadius: "12px",
  background: "#17172a",
  cursor: "pointer"
};
