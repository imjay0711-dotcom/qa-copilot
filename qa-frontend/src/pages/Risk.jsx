import { useState } from "react";
import axios from "axios";

export default function Risk() {
  const [releaseNotes, setReleaseNotes] = useState("");
  const [modules, setModules] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/analyze-risk", {
        release_notes: releaseNotes,
        changed_modules: modules.split(",").map((m) => m.trim()),
      });
      const parsed = JSON.parse(res.data.data.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (err) {
      alert("Error analyzing risk!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: "#1e3a5f" }}>⚠️ Risk Analyzer</h2>
      <p style={{ color: "#666" }}>Enter release details and get risk assessment instantly!</p>

      <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Release Notes:</label>
        <textarea
          value={releaseNotes}
          onChange={(e) => setReleaseNotes(e.target.value)}
          placeholder="Fixed payment gateway bug, updated user authentication..."
          style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" }}
        />

        <label style={{ fontWeight: "bold", display: "block", margin: "16px 0 8px" }}>Changed Modules (comma separated):</label>
        <input
          value={modules}
          onChange={(e) => setModules(e.target.value)}
          placeholder="Payment, Authentication, Dashboard"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" }}
        />
        <br /><br />
        <button onClick={generate} disabled={loading || !releaseNotes}
          style={{ background: "#e65100", color: "white", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
          {loading ? "⏳ Analyzing..." : "⚠️ Analyze Risk"}
        </button>
      </div>

      {result && (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginTop: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{
            background: result.risk_level === "high" ? "#ffebee" : result.risk_level === "medium" ? "#fff8e1" : "#e8f5e9",
            padding: "16px", borderRadius: "8px", marginBottom: "16px", textAlign: "center"
          }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: result.risk_level === "high" ? "#c62828" : result.risk_level === "medium" ? "#f57f17" : "#2e7d32" }}>
              {result.risk_level?.toUpperCase()} RISK
            </div>
            <div>Regression Scope: <strong>{result.regression_scope}</strong> | Estimated Effort: <strong>{result.estimated_effort}</strong></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: "#ffebee", padding: "12px", borderRadius: "8px" }}>
              <strong>🎯 High Priority Areas:</strong>
              <ul>{result.high_priority_areas?.map((a, i) => <li key={i}>{a}</li>)}</ul>
            </div>
            <div style={{ background: "#e3f2fd", padding: "12px", borderRadius: "8px" }}>
              <strong>🔍 Test Focus:</strong>
              <ul>{result.test_focus?.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </div>
            <div style={{ background: "#fff8e1", padding: "12px", borderRadius: "8px", gridColumn: "1/-1" }}>
              <strong>⚠️ Risk Factors:</strong>
              <ul>{result.risk_factors?.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}