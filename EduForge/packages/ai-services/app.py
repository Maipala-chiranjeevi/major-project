from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load a pre-trained model for summarization
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    summary = summarizer(text, max_length=150, min_length=30, do_sample=False)

    return jsonify({'summary': summary[0]['summary_text']})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
