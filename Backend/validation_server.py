from sys import path
path.append('../')

import Backend.src.db2.voter as voter
import Backend.src.db1.elections as elections
import Backend.src.db1.electionList as electionList
import Backend.src.db1.candidate as candidate
import Backend.src.db1.votingCode as votingCode

from flask import Flask, jsonify, Response, request, redirect, url_for
from flask_cors import CORS

from json import loads, dumps

app = Flask(__name__)
CORS(app)

@app.route('/elections/validateUser', methods = ['POST'])
def validateUser():
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        surname = data.get('surname')
        pesel = data.get('PESEL')
        if voter.verify(pesel, name, surname) == True:
            json_data = {'verification' : True}
            return json_data, 200
        else:
            json_data = {'verification' : False}
            return json_data, 400

if __name__ == '__main__':
    app.run(port = 5001, debug=True)