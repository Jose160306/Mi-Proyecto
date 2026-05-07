// Tarjeta pequeña que muestra un dato del panel principal
function StatCard({ label, value, color, icon }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        padding: "20px 28px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
        minWidth: 160,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
        borderTop: `4px solid ${color}`,
      }}
    >
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color }}>{value}</div>
      <div style={{ color: "#6b7280", fontSize: 14 }}>{label}</div>
    </div>
  );
}

export default StatCard;
