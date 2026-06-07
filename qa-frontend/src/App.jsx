import { useState } from "react";
import TestCase from "./pages/TestCase";
import BugReport from "./pages/BugReport";
import Summary from "./pages/Summary";
import Risk from "./pages/Risk";

export default function App() {
  const [activePage, setActivePage] = useState("testcase");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f0f4f8" }}>
      {/* Header */}
      <div style={{ background: "#1e3a5f", color: "white", padding: "16px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>🤖 QA Copilot</h1>
        <span style={{ opacity: 0.7, fontSize: "14px" }}>AI-Powered QA Assistant</span>
      </div>

      {/* Navigation */}
      <div style={{ background: "#2d5986", display: "flex", padding: "0 32px" }}>
        {[
          { id: "testcase", label: "📋 Test Cases" },
          { id: "bugreport", label: "🐛 Bug Report" },
          { id: "summary", label: "📊 Test Summary" },
          { id: "risk", label: "⚠️ Risk Analyzer" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              background: activePage === item.id ? "#1e3a5f" : "transparent",
              color: "white",
              border: "none",
              padding: "14px 20px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: activePage === item.id ? "bold" : "normal",
              borderBottom: activePage === item.id ? "3px solid #4fc3f7" : "3px solid transparent",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}>
        {activePage === "testcase" && <TestCase />}
        {activePage === "bugreport" && <BugReport />}
        {activePage === "summary" && <Summary />}
        {activePage === "risk" && <Risk />}
      </div>
    </div>
  );
}