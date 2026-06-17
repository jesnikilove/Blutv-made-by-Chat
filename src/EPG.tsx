import { useState } from "react";
import ChannelPlayer from "./ChannelPlayer";
import EPGHero from "./EPGHero";
import ProgramDetails from "./ProgramDetails";
import { addFavorite } from "./FavoritesStore";

export default function EPG() {
  const guide = [
    {
      channel: "Nickelodeon",
      programs: [
        {
          title: "SpongeBob SquarePants",
          start: "2:00 PM",
          end: "3:00 PM",
          description:
            "SpongeBob and Patrick accidentally cause chaos in Bikini Bottom while trying to help their friends."
        },
        {
          title: "The Loud House",
          start: "3:00 PM",
          end: "3:30 PM",
          description:
            "Lincoln tries to survive life with ten sisters in a very busy household."
        }
      ]
    },
    {
      channel: "Cartoon Network",
      programs: [
        {
          title: "Teen Titans Go!",
          start: "2:00 PM",
          end: "2:30 PM",
          description:
            "Robin, Starfire, Raven, Beast Boy and Cyborg get into another ridiculous adventure."
        },
        {
          title: "Adventure Time",
          start: "2:30 PM",
          end: "4:00 PM",
          description:
            "Finn and Jake explore the Land of Ooo and encounter strange magical creatures."
        }
      ]
    },
    {
      channel: "Disney Channel",
      programs: [
        {
          title: "Bluey",
          start: "2:00 PM",
          end: "2:30 PM",
          description:
            "Bluey and Bingo create imaginative games and adventures with their family."
        },
        {
          title: "Phineas & Ferb",
          start: "2:30 PM",
          end: "4:00 PM",
          description:
            "Two inventive brothers spend every day creating amazing projects and adventures."
        }
      ]
    },
    {
      channel: "ESPN",
      programs: [
        {
          title: "SportsCenter",
          start: "2:00 PM",
          end: "3:00 PM",
          description:
            "Breaking sports news, highlights, analysis and scores from around the world."
        },
        {
          title: "NBA Live",
          start: "3:00 PM",
          end: "5:00 PM",
          description:
            "Live NBA action featuring today's featured matchup."
        }
      ]
    }
  ];

  const [showPlayer, setShowPlayer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  
  const [selected, setSelected] = useState(
    guide[0].programs[0]
  );

  const currentChannel =
    guide.find(g =>
      g.programs.some(
        p => p.title === selected.title
      )
    )?.channel || "Live TV";

  if (showPlayer) {
    return (
      <div>
        <button
          onClick={() => setShowPlayer(false)}
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            border: "none",
            marginBottom: 20
          }}
        >
          ← Back To Guide
        </button>

        <ChannelPlayer
          channel={currentChannel}
          title={selected.title}
          description={selected.description}
        />
      </div>
    );
  }

  if (showDetails) {
    return (
      <div>
        <button
          onClick={() => setShowDetails(false)}
          style={{
            padding: "12px 20px",
            borderRadius: 12,
            border: "none",
            marginBottom: 20
          }}
        >
          ← Back
        </button>

        <ProgramDetails
          channel={currentChannel}
          title={selected.title}
          start={selected.start}
          end={selected.end}
          description={selected.description}
        />
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <EPGHero
        title={selected.title}
        channel={currentChannel}
        start={selected.start}
        end={selected.end}
        description={selected.description}
        onWatchLive={() => setShowPlayer(true)}
        onMoreInfo={() => setShowDetails(true)}
        onFavorite={() => {
          addFavorite(selected.title,"Program");
          alert("Added To Favorites");
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 15
        }}
      >
        
<div
  style={{
    background:"linear-gradient(135deg,#1f1045,#7d4dff)",
    borderRadius:12,
    padding:15,
    fontWeight:"bold",
    textAlign:"center"
  }}
>
  CHANNELS
</div>

<div
  style={{
    display:"grid",
    gridTemplateColumns:"repeat(5,1fr)",
    gap:10,
    marginBottom:10
  }}
>
          {["2:00","2:30","3:00","3:30","4:00"].map(time => (
            <div
              key={time}
              style={{
                background: "#1f2937",
                padding: 12,
                borderRadius: 12,
                textAlign: "center"
              }}
            >
              {time}
            </div>
          ))}
        </div>

        {guide.map(row => (
          <>
            <div
              key={{"Nickelodeon":"🟠 NICK","Cartoon Network":"⚫ CN","Disney Channel":"🔵 DISNEY","ESPN":"🔴 ESPN"}[row.channel] || row.channel}
              style={{
                background:"linear-gradient(135deg,#1f1045,#151f45)",
                borderRadius:12,
                padding:15,
                marginBottom:10,
                fontWeight:"bold",
                borderRight:"3px solid #2d8cff"
              }}
            >
              {{"Nickelodeon":"🟠 NICK","Cartoon Network":"⚫ CN","Disney Channel":"🔵 DISNEY","ESPN":"🔴 ESPN"}[row.channel] || row.channel}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10
              }}
            >
              {row.programs.map(program => (
                <div
                  key={program.title}
                  onClick={() => setSelected(program)}
                  style={{
                    flex: 1,
                    padding: 15,
                    cursor: "pointer",
                    borderRadius: 12,
                    background:
                      selected.title === program.title
                        ? "linear-gradient(135deg,#7d4dff,#2d8cff)"
                        : "#111827"
                  }}
                >
                  {program.title}
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
