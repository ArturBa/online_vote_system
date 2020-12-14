from sys import path, stdout
path.append('../')
import Backend.src.db2.voter as voter
import Backend.src.db1.elections as elections
import Backend.src.db1.electionList as electionList
import Backend.src.db1.candidate as candidate
import Backend.src.db1.votingCode as votingCode
import datetime
import requests

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/election/<int:id>/status', methods=['GET'])
def index(id):
    electionsQuery = elections.get(id)
    return jsonify(electionsState=electionsQuery.electionsState, startDate=electionsQuery.startTime.isoformat(),\
                   endDate=electionsQuery.endTime.isoformat())


@app.route('/election/<int:id>/getCode', methods=['POST', 'GET'])
def code(id):
    if request.method == "POST":
        body = request.json
        firstName = body["name"]
        secondName = body["surname"]
        pesel = body["PESEL"]
        verificationResults = requests.post('http://localhost:5001/elections/validateUser', json = body)
        if verificationResults.status_code:
            if votingCode.get(id, pesel) is None:
                new_code = votingCode.create(id, pesel)
                code = new_code.codeToVote
                return code, 200
            else:
                query = votingCode.get(id, pesel)
                code = query.codeToVote
                return code, 200
        else:
            error = "Voter is not in DB"
            return error, 400


@app.route('/election/<int:id>/candidates', methods=['GET'])
def candidates(id):
    query = elections.get_candidates(id)
    maxVotes = query[0]
    lists = query[1]
    candidates = []
    for candidate in lists:
        if any(elem.get("id") == candidate[0] for elem in candidates):
            i = [elem.get("id") for elem in candidates].index(candidate[0])
            candidates[i]["candidates"].append({'id': candidate[2], 'name': candidate[3], 'surname': candidate[4]})
        else:
            candidates.append({'id': candidate[0], 'name': candidate[1], 'candidates': []})
            i = [elem.get("id") for elem in candidates].index(candidate[0])
            candidates[i]["candidates"].append({'id': candidate[2], 'name': candidate[3], 'surname': candidate[4]})
    return jsonify(maxVotes=maxVotes, list=candidates)


@app.route('/election/<int:id>/vote', methods=['POST', 'GET'])
def vote(id):
    if request.method == "POST":
        body = request.json
        code = body["code"]
        lists = body["vote_list"]
        if votingCode.verify(code):
            for list in lists:
                for cand in list["candidates"]:
                    list_id = list["id"]
                    cand_id = cand["id"]
                    name = cand["name"]
                    surname = cand["surname"]
                    result = candidate.vote(list_id, cand_id, name, surname)
                    print(result, file=stdout)
            message = "Success"
            return message, 200
        else:
            message = "Code invalid"
            return message, 400

if __name__ == '__main__':
    app.run(debug=True)