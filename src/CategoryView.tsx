export default function CategoryView({ title }: { title: string }) {
  return (
    <div style={{ color: "white" }}>
      <h1>{title}</h1>

      <div
        style={{
          marginTop: 20,
          background: "#111827",
          padding: 20,
          borderRadius: 20
        }}
      >
        {title} content will appear here.
      </div>
    </div>
  );
}
