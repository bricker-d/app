import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const series = [
  { date: "12/08", hrv: 46, sleep: 72, rhr: 61 },
  { date: "12/09", hrv: 44, sleep: 68, rhr: 63 },
  { date: "12/10", hrv: 49, sleep: 76, rhr: 60 },
  { date: "12/11", hrv: 41, sleep: 64, rhr: 65 },
  { date: "12/12", hrv: 52, sleep: 80, rhr: 59 },
  { date: "12/13", hrv: 48, sleep: 74, rhr: 60 },
  { date: "12/14", hrv: 45, sleep: 70, rhr: 62 },
];

function riskScore(last: typeof series[number]) {
  const score = Math.min(
    100,
    Math.round(20 + Math.max(0, (55 - last.hrv) * 0.8) + Math.max(0, (last.rhr - 58) * 1.2) + Math.max(0, (78 - last.sleep) * 0.9))
  );
  const label = score < 35 ? "Low" : score < 60 ? "Moderate" : score < 80 ? "High" : "Very High";
  return { score, label };
}

export default function Dashboard() {
  const last = series[series.length - 1];
  const risk = riskScore(last);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end" }}>
        <div>
          <h1>Dashboard</h1>
          <div style={{ opacity: 0.7 }}>Latest: {last.date}</div>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, minWidth: 140 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Risk</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{risk.label}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{risk.score}/100</div>
        </div>
      </div>

      <div style={{ marginTop: 24, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
        <h3>HRV (ms)</h3>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={series}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hrv" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Sleep score</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{last.sleep}</div>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Resting HR</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{last.rhr}</div>
        </div>
        <a href="/settings" style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, textDecoration: "none", color: "inherit" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Settings</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>Open</div>
        </a>
      </div>
    </div>
  );
}
