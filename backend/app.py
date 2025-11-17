from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_groq(prompt):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"ERROR: {str(e)}"

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    deadlines = call_groq("Extract all deadlines and due dates from this syllabus:\n" + text)
    summary = call_groq("Summarize all assignments in this syllabus:\n" + text)
    strategies = call_groq("Suggest learning strategies for succeeding in this class based on this syllabus:\n" + text)

    return jsonify({
        "deadlines": deadlines,
        "summary": summary,
        "strategies": strategies
    })

if __name__ == "__main__":
    print("🚀 Backend running with Groq!")
    app.run(debug=True)

