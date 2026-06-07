import { useState } from "react";
import axios from "axios";

export default function BugReport() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      const res = await axios.post("http://localhost:8000/api/generate-bugreport", formData);
      const parsed = JSON.parse(res.data.data.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (err) {
      alert("Error generating bug report!");
    }
    setLoading(false);
  };

  const severityColor = { critical: "#b71c1c", high: "#e53935", medium: "#fb8c00", low: "#43a047" };

  return (
    <div>
      <h2 style={{ color: "#1e3a5f" }}>🐛 Bug Report Writer</h2>
      <p style={{ color: "#666" }}>Describe the bug and get a professional report instantly!</p>

      <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Bug Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Login button not working when password contains special characters..."
          style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" }}
        />
        <br /><br />
        <button
          onClick={generate}
          disabled={loading || !description}
          style={{ background: "#c62828", color: "white", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        >
          {loading ? "⏳ Generating..." : "🐛 Generate Bug Report"}
        </button>
      </div>

      {result && (
        <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginTop: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#c62828", marginTop: 0 }}>{result.title}</h3>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <span style={{ background: severityColor[result.severity] || "#e53935", color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "13px" }}>
              Severity: {result.severity}
            </span>
            <span style={{ background: "#1e3a5f", color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "13px" }}>
              Priority: {result.priority}
            </span>
          </div>
          <div style={{ display: "grid", gap: "12px" }}>
            <div style={{ background: "#f5f5f5", padding: "12px", borderRadius: "8px" }}>
              <strong>Steps to Reproduce:</strong>
              <ol>{result.steps_to_reproduce.map((s, i) => <li key={i}>{s}</li>)}</ol>
            </div>
            <div style={{ background: "#e8f5e9", padding: "12px", borderRadius: "8px" }}>
              <strong>Expected Result:</strong> <p>{result.expected_result}</p>
            </div>
            <div style={{ background: "#ffebee", padding: "12px", borderRadius: "8px" }}>
              <strong>Actual Result:</strong> <p>{result.actual_result}</p>
            </div>
            <div style={{ background: "#fff8e1", padding: "12px", borderRadius: "8px" }}>
              <strong>Possible Cause:</strong> <p>{result.possible_cause}</p>
            </div>
            <div style={{ background: "#e3f2fd", padding: "12px", borderRadius: "8px" }}>
              <strong>Suggested Fix:</strong> <p>{result.suggested_fix}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}