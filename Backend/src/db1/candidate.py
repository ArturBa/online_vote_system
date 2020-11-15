from sqlalchemy import Column, ForeignKey,Integer, String
from sqlalchemy.orm import relationship
from Backend.src.base import Base
from Backend.src.db1.db1 import Session1

class Candidate(Base):
    __tablename__ = 'candidate'
    id = Column(Integer, primary_key=True)
    electionList_id = Column(Integer,ForeignKey('electionList.id'), nullable=False)
    firstName = Column(String, nullable=False)
    secondName = Column(String, nullable=False)
    numberOfVotes = Column(Integer, nullable=False)

    def __init__(self, electionList, firstName, secondName):
        self.electionList_id = electionList
        self.firstName = firstName
        self.secondName = secondName
        self.numberOfVotes = 0;
        
    def __repr__(self):
        return f"<, Id: {self.id},  List_id: {self.electionList_id}, Name: {self.firstName} {self.secondName} >"

def get_all():
    #get all candidates
    session = Session1()
    candidates = session.query(Candidate).all()
    return  candidates

def get(electionsList, firstName, secondName):
    #get the candidate with given id
    session = Session1()
    candidate = session.query(Candidate)\
        .filter_by(electionList_id=electionsList,firstName=firstName,secondName=secondName ).scalar()
    return  candidate

def add(electionsList, firstName, secondName):
    #add a candidate with given electionList id, first name, second name and 0 votes
    session = Session2()
    if get(electionsList, firstName, secondName)is None:
        new_candidate = Candidate(electionsList, firstName, second_name)
        session.add(new_voter)
        session.commit()
        session.close()
        return 1
    else:
        return 0

def delete(id):
    #delete the candidate with given id
    session = Session1()
    exists = session.query(Candidate).filter_by(id=id).delete()
    session.commit()
    session.close()

def vote(electionsList, firstName, secondName):
    #add 1 vote to the candidate with given firstName and secondName from given election list
    session = Session1()
    candidate = session.query(Candidate) \
        .filter_by(electionList_id=electionsList, firstName=firstName, secondName=secondName)
    if Candidate is not None:
        candidate.update({'numberOfVotes': Candidate.numberOfVotes+1})
        session.commit()
        session.close()
        return 1
    else:
        return 0