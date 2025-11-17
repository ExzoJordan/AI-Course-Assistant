import React, { useState } from "react";

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
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>AI Course Success Assistant</h1>
      <p>Paste a syllabus below and click Analyze.</p>

      <textarea
        rows="10"
        cols="80"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste syllabus text here..."
        style={{ display: "block", width: "100%", maxWidth: "900px" }}
      />

      <button
        onClick={analyze}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <h2>Deadlines</h2>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          maxWidth: "900px",
          minHeight: "40px",
        }}
      >
        {deadlines}
      </div>

      <h2>Assignment Summary</h2>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          maxWidth: "900px",
          minHeight: "40px",
        }}
      >
        {summary}
      </div>

      <h2>Suggested Learning Strategies</h2>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          maxWidth: "900px",
          minHeight: "40px",
        }}
      >
        {strategies}
      </div>
    </div>
  );
}

export default App;

