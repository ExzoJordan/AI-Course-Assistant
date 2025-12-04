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

    deadlines = call_groq(
        "Extract ONLY real deadlines that appear in this syllabus. "
        "If no date is mentioned, do NOT invent one. "
        "Return 3–6 bullet points. "
        "Each bullet must be under 12 words. "
        "Format like: • Date – Item. "
        "Text:\n" + text
    )

    summary = call_groq(
        "Summarize the major graded assignments from this syllabus. "
        "DO NOT invent assignments not in the text. "
        "Return 3–5 bullet points. "
        "Each bullet must be under 12 words. "
        "Only list real assignments that appear in the text. "
        "If unclear, write 'Unclear assignment details'. "
        "Text:\n" + text
    )

    strategies = call_groq(
        "Suggest 3 REALISTIC learning strategies based on the syllabus content. "
        "Each must be under 12 words. "
        "Do NOT give generic advice like 'study more.' "
        "Base each strategy on grading, assignments, pace, or policies in the text. "
        "Text:\n" + text
    )

    return jsonify({
        "deadlines": deadlines,
        "summary": summary,
        "strategies": strategies
    })


if __name__ == "__main__":
    print("🚀 Backend running with Groq!")
    app.run(debug=True)
