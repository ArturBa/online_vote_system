from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/status', methods = ['GET'])
def index():
    return jsonify(electionsState = 'ACTIVE', startTime = '1970-01-01 00:00:00', endTime = '2020-01-01 00:00:00')

if __name__ == '__main__':
    app.run(debug=True)