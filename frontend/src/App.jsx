import React, { useState } from "react";

function formatText(text) {
  if (!text) return "";

  // Split by newlines or dashes and convert to bullet points
  const lines = text
    .split(/\n|-/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <ul style={{ paddingLeft: "20px" }}>
      {lines.map((line, i) => (
        <li key={i} style={{ marginBottom: "6px" }}>
          {line}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [text, setText] = useState("");
  const [deadlines, setDeadlines] = useState("");
  const [summary, setSummary] = useState("");
  const [strategies, setStrategies] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) {
      alert("Paste some syllabus text first.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Backend error: ${res.status}`);
      }

      const data = await res.json();
      setDeadlines(data.deadlines || "No deadlines found.");
      setSummary(data.summary || "No summary found.");
      setStrategies(data.strategies || "No strategies found.");
    } catch (err) {
      alert("Error connecting to backend: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          🎓 AI Course Success Assistant
        </h1>
        <p style={{ textAlign: "center", marginBottom: "30px" }}>
          Paste your syllabus text below. The AI will analyze deadlines, assignments, and learning strategies.
        </p>

        <textarea
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste syllabus text here..."
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        />

        <button
          onClick={analyze}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#888" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: loading ? "default" : "pointer",
            marginBottom: "30px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* --- RESULTS CARDS --- */}
        <div
          style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2>📅 Deadlines</h2>
          {formatText(deadlines)}
        </div>

        <div
          style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2>📝 Assignment Summary</h2>
          {formatText(summary)}
        </div>

        <div
          style={{
            background: "#fafafa",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2>🎯 Learning Strategies</h2>
          {formatText(strategies)}
        </div>
      </div>
    </div>
  );
}

export default App;
