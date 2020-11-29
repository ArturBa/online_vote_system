from sys import path, stdout
path.append('../')
import Backend.src.db2.voter as voter
import Backend.src.db1.elections as elections
import Backend.src.db1.electionList as electionList
import Backend.src.db1.candidate as candidate
import Backend.src.db1.votingCode as votingCode
import datetime


from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/status', methods = ['POST', 'GET'])
def index():
    electionsQuery = elections.get_all()[1]
    return jsonify(electionsState = electionsQuery.electionsState, startTime = electionsQuery.startTime,\
                   endTime = electionsQuery.endTime)


@app.route('/getCode', methods=['POST', 'GET'])
def code():
    if request.method == "POST":
        body = request.json
        electionID = body["electionID"]
        firstName = body["name"]
        secondName = body["surname"]
        pesel = body["PESEL"]
        if voter.verify(pesel, firstName, secondName):
            if votingCode.get(electionID, pesel) is None:
                new_code = votingCode.create(electionID, pesel)
                code = new_code.codeToVote
                return code, 200
            else:
                query = votingCode.get(electionID, pesel)
                code = query.codeToVote
                return code, 200
        else:
            error = "Voter is not in DB"
            return error, 400


if __name__ == '__main__':
    app.run(debug=True)