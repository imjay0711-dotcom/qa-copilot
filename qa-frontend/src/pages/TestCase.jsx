import { useState } from "react";
import axios from "axios";

export default function TestCase() {
  const [userStory, setUserStory] = useState("");
  const [appType, setAppType] = useState("web");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/generate-testcases", {
        user_story: userStory,
        app_type: appType,
      });
      const parsed = JSON.parse(res.data.data.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (err) {
      alert("Error generating test cases!");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: "#1e3a5f" }}>📋 Test Case Generator</h2>
      <p style={{ color: "#666" }}>Enter a user story and get complete test cases instantly!</p>

      <div style={{ background: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>User Story:</label>
        <textarea
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
          placeholder="As a user, I want to login with email and password..."
          style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" }}
        />

        <label style={{ fontWeight: "bold", display: "block", margin: "16px 0 8px" }}>App Type:</label>
        <select
          value={appType}
          onChange={(e) => setAppType(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" }}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="api">API</option>
        </select>

        <br /><br />
        <button
          onClick={generate}
          disabled={loading || !userStory}
          style={{ background: "#1e3a5f", color: "white", border: "none", padding: "12px 32px", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        >
          {loading ? "⏳ Generating..." : "🚀 Generate Test Cases"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: "24px" }}>
          <h3 style={{ color: "#1e3a5f" }}>
            ✅ {result.feature} — {result.total_cases} Test Cases
          </h3>
          {result.test_cases.map((tc) => (
            <div key={tc.id} style={{
              background: "white", padding: "16px", borderRadius: "10px",
              marginBottom: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              borderLeft: `4px solid ${tc.type === "positive" ? "#4caf50" : tc.type === "negative" ? "#f44336" : "#ff9800"}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <strong>{tc.id}: {tc.title}</strong>
                <span style={{
                  background: tc.priority === "high" ? "#ffebee" : tc.priority === "medium" ? "#fff8e1" : "#e8f5e9",
                  color: tc.priority === "high" ? "#c62828" : tc.priority === "medium" ? "#f57f17" : "#2e7d32",
                  padding: "2px 10px", borderRadius: "12px", fontSize: "12px"
                }}>{tc.priority}</span>
              </div>
              <p style={{ color: "#666", margin: "4px 0", fontSize: "13px" }}>
                <strong>Type:</strong> {tc.type}
              </p>
              <p style={{ color: "#666", margin: "4px 0", fontSize: "13px" }}>
                <strong>Preconditions:</strong> {tc.preconditions}
              </p>
              <ol style={{ margin: "8px 0", paddingLeft: "20px" }}>
                {tc.steps.map((step, i) => (
                  <li key={i} style={{ color: "#444", fontSize: "13px" }}>{step}</li>
                ))}
              </ol>
              <p style={{ color: "#1e3a5f", margin: "4px 0", fontSize: "13px" }}>
                <strong>Expected:</strong> {tc.expected_result}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}