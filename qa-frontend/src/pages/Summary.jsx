import { useState } from "react";
import axios from "axios";

export default function Summary() {
  const [sprintName, setSprintName] = useState("");
  const [results, setResults] = useState([{ test_name: "", status: "pass", module: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const addRow = () => setResults([...results, { test_name: "", status: "pass", module: "" }]);

  const updateRow = (i, field, value) => {
    const updated = [...results];
    updated[i][field] = value;
    setResults(updated);
  };

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/generate-summary", {
        sprint_name: sprintName,
        results: results.filter(r => r.test_name),
      });
      const parsed = JSON.parse(res.data.data.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (err) {
      alert("Error generating summary!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: "#1e3a5f" }}>📊 Test Summary Generator</h2>
      <p style={{ color: "#666" }}>Enter test results and get a manager-ready report!</p>

      <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Sprint Name:</label>
        <input
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
          placeholder="Sprint 24"
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box", marginBottom: "16px" }}
        />

        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Test Results:</label>
        {results.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            <input placeholder="Test name" value={r.test_name} onChange={(e) => updateRow(i, "test_name", e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }} />
            <select value={r.status} onChange={(e) => updateRow(i, "status", e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
              <option value="skip">Skip</option>
            </select>
            <input placeholder="Module" value={r.module} onChange={(e) => updateRow(i, "module", e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }} />
          </div>
        ))}
        <button onClick={addRow} style={{ background: "#e3f2fd", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", marginBottom: "16px" }}>
          + Add Row
        </button>
        <br />
        <button onClick={generate} disabled={loading || !sprintName}
          style={{ background: "#1e3a5f", color: "white", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
          {loading ? "⏳ Generating..." : "📊 Generate Summary"}
        </button>
      </div>

      {result && (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginTop: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#1e3a5f" }}>Sprint Report: {sprintName}</h3>
          <p>{result.summary}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
            {[
              { label: "Total", value: result.total_tests, color: "#1e3a5f" },
              { label: "Passed", value: result.passed, color: "#4caf50" },
              { label: "Failed", value: result.failed, color: "#f44336" },
              { label: "Pass Rate", value: result.pass_rate, color: "#ff9800" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#f5f5f5", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "#666" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: result.risk_level === "high" ? "#ffebee" : "#e8f5e9", padding: "12px", borderRadius: "8px", marginBottom: "12px" }}>
            <strong>Risk Level:</strong> {result.risk_level} | <strong>Recommendation:</strong> {result.recommendation}
          </div>
          <div style={{ background: "#f5f5f5", padding: "12px", borderRadius: "8px" }}>
            <strong>Key Observations:</strong>
            <ul>{result.key_observations?.map((o, i) => <li key={i}>{o}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}