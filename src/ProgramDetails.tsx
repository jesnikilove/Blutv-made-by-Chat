export default function ProgramDetails({
  title,
  channel,
  start,
  end,
  description
}: {
  title: string;
  channel: string;
  start: string;
  end: string;
  description: string;
}) {
  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg,#1f1045,#7d4dff,#2d8cff)",
          borderRadius: 24,
          padding: 30
        }}
      >
        <div>{channel}</div>

        <h1
          style={{
            fontSize: "clamp(28px,4vw,64px)"
          }}
        >
          {title}
        </h1>

        <div
          style={{
            fontWeight: "bold",
            marginBottom: 20
          }}
        >
          {start} - {end}
        </div>

        <p
          style={{
            lineHeight: 1.7,
            fontSize: 18
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
