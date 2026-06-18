import { useEffect, useState } from "react";
import LiveTV from "./LiveTV";
import EPG from "./EPG";
import Favorites from "./Favorites";
import Movies from "./Movies";
import Series from "./Series";
import Settings from "./Settings";
import CategoryView from "./CategoryView";

export default function HomeScreen() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    const onPopState = () => {
      setPage("Home");
    };

    window.addEventListener("popstate", onPopState);

    return () =>
      window.removeEventListener("popstate", onPopState);
  }, []);

  const renderContent = () => {
    switch (page) {
      case "Live TV":
        return <LiveTV />;

      case "EPG":
        return <EPG onHome={() => setPage("Home")} />;

      case "EPG":
        return <EPG onHome={() => setPage("Home")} />;

      case "Favorites":
        return <Favorites />;

      case "Movies":
        return <Movies />;

      case "Series":
        return <Series />;

      case "Settings":
        return <Settings />;

      case "Prime Crime":
      case "Women's Favorites":
      case "Sports":
      case "Kids":
      case "International":
        return <CategoryView title={page} />;

      default:
        return (
          <>
            <h1>Welcome to StreamLine BluTV</h1>

            <div
              style={{
                marginTop: 20,
                background: "#111827",
                padding: 20,
                borderRadius: 20
              }}
            >
              Home Dashboard
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                gap: 20,
                marginTop: 20
              }}
            >
              {[
                "Prime Crime",
                "Women's Favorites",
                "Sports",
                "Movies",
                "Series",
                "Live TV"
              ].map((item) => (
                <div
                  key={item}
                  onClick={() => {
              if (item === "EPG") {
                window.history.pushState(
                  { page:"EPG" },
                  ""
                );
              }
              setPage(item);
            }}
                  style={{
                    height: 180,
                    borderRadius: 18,
                    padding: 20,
                    display: "flex",
                    alignItems: "end",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg,#111827,#7d4dff,#2d8cff)"
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  const navItems = [
    "Home",
    "Favorites",
    "Live TV",
    "EPG",
    "Prime Crime",
    "Women's Favorites",
    "Sports",
    "Kids",
    "Movies",
    "Series",
    "International",
    "Settings"
  ];

  return (
    page === "EPG"
      ? <div style={{background:"#05010d",color:"white",height:"100vh",overflow:"hidden"}}>{renderContent()}</div>
      : <div style={{background:"#05010d",color:"white",minHeight:"100vh",display:"flex",fontFamily:"Arial, sans-serif"}}>
      <div style={{width:260,
          background: "#0f0f1c",
          padding: 25,
          borderRight: "1px solid #222"
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: "bold",
            marginBottom: 35,
            color: "#8ec5ff"
          }}
        >
          BluTV
        </div>

        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => setPage(item)}
            style={{
              padding: 14,
              borderRadius: 12,
              marginBottom: 10,
              cursor: "pointer",
              background:
                page === item
                  ? "linear-gradient(90deg,#7d4dff,#ff4fd8)"
                  : "transparent"
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
          overflowY: "auto"
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
