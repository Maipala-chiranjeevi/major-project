from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load a pre-trained model for summarization
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
qa_generator = pipeline("text2text-generation", model="valhalla/t5-base-qg-hl")

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    summary = summarizer(text, max_length=150, min_length=30, do_sample=False)

    return jsonify({'summary': summary[0]['summary_text']})

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    # For simplicity, we'll generate one question here. In a real app, you'd generate more.
    qa_pairs = qa_generator(text, max_length=64)

    # This is a more advanced representation of a quiz
    # In a real application, you would use a more sophisticated method to generate distractors
    question = qa_pairs[0]['generated_text'].split('<sep>')[0]
    answer = qa_pairs[0]['generated_text'].split('<sep>')[1]

    quiz = {
        'mcqs': [
            {
                'question': question,
                'options': [answer, 'Distractor 1', 'Distractor 2', 'Distractor 3'],
                'answer': answer
            }
        ],
        'flashcards': [
            {
                'question': question,
                'answer': answer
            }
        ]
    }

    return jsonify(quiz)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
