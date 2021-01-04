from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from Backend.src.base import Base
from Backend.src.db1.db1 import Session1


class Candidate(Base):
    __tablename__ = 'candidate'
    id = Column(Integer, primary_key=True)
    electionList_id = Column(Integer, ForeignKey('electionList.id'), nullable=False)
    firstName = Column(String, nullable=False)
    secondName = Column(String, nullable=False)
    numberOfVotes = Column(Integer)

    def __init__(self, electionList, firstName, secondName):
        self.electionList_id = electionList
        self.firstName = firstName
        self.secondName = secondName
        self.numberOfVotes = 0

    def __repr__(self):
        return f"<, Id: {self.id},  List_id: {self.electionList_id}, Name: {self.firstName} {self.secondName} >"


def get_all():
    # get all candidates
    session = Session1()
    candidates = session.query(Candidate).all()
    session.close()
    return candidates


def get(electionsList, firstName, secondName):
    # get the candidate with given id
    session = Session1()
    candidate = session.query(Candidate) \
        .filter_by(electionList_id=electionsList, firstName=firstName, secondName=secondName).scalar()
    session.close()   
    return candidate


def add(electionsList, firstName, secondName):
    # add a candidate with given electionList id, first name, second name and 0 votes
    session = Session1()
    if get(electionsList, firstName, secondName) is None:
        new_candidate = Candidate(electionsList, firstName, secondName)
        session.add(new_candidate)
        session.commit()
        session.close()
        return 1
    else:
        session.close()
        return 0


def delete(id):
    # delete the candidate with given id
    session = Session1()
    session.query(Candidate).filter_by(id=id).delete()
    session.commit()
    session.close()


def vote(electionsList, id, firstName, secondName):
    # add 1 vote to the candidate with given id , firstName and secondName from given election list
    session = Session1()
    candidate = session.query(Candidate) \
        .filter_by(electionList_id=electionsList, id=id, firstName=firstName, secondName=secondName)
    if candidate is not None:
        if candidate.scalar().numberOfVotes is None:
            candidate.update({'numberOfVotes': 1})
        else:
            candidate.update({'numberOfVotes': Candidate.numberOfVotes + 1})
        session.commit()
        session.close()
        return 1
    else:
        session.close()
        return 0
