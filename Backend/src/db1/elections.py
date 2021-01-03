from sqlalchemy import Column, ForeignKey, Integer, String, Enum, DateTime, func
from sqlalchemy.orm import relationship
from Backend.src.base import Base
from Backend.src.db1.db1 import Session1
from Backend.src.db1.electionList import ElectionList
from Backend.src.db1.candidate import Candidate
import datetime


class Elections(Base):
    __tablename__ = 'elections'
    id = Column(Integer, primary_key=True)
    electionsState = Column(Enum("inEdition", "registered", "ongoing", "finished", "closed"), nullable=False)
    startTime = Column(DateTime)
    endTime = Column(DateTime)
    electedOrgan = Column(String, nullable=False)
    votesToUse = Column(Integer, nullable=False)
    lists = relationship("ElectionList")
    codes = relationship("VotingCode", cascade="all, delete")

    def __init__(self, electedOrgan, votesToUse):
        self.electedOrgan = electedOrgan
        self.votesToUse = votesToUse
        self.electionsState = "inEdition"

    def __repr__(self):
        return f"<Id: {self.id}, electionState: {self.electionsState}, electedOrgan: {self.electedOrgan}, t:{self.startTime}>"


def get_all():
    # get all elections
    session = Session1()
    elections = session.query(Elections).all()
    session.close()
    return elections


def get(id):
    # get the election with given id
    session = Session1()
    election = session.query(Elections).filter_by(id=id).scalar()
    session.close()
    return election


def create(electedOrgan, votesToUse):
    # create a new election with given electedOrgan, votesToUse and state "inEdition"
    session = Session1()
    new_election = Elections(electedOrgan, votesToUse)
    session.add(new_election)
    session.commit()
    session.close()


def register(id, startTime, endTime):
    # check if any electionLists are linked to this election
    # add startTime, endTime and set status to "registered"
    # datetime format 'YYYY-MM-DD hh:mm:ss'
    session = Session1()
    election = session.query(Elections).filter_by(id=id)
    if (election.scalar().lists == []):
        session.close()
        return 0
    else:
        election.update({'startTime': startTime, 'endTime': endTime, 'electionsState': 'registered'})
        session.commit()
        session.close()
        return 1


def count_votes(id):
    # get all candidates and theirs number of votes from lists registered to given election id
    session = Session1()
    votes = session.query(ElectionList.listName, Candidate.firstName, Candidate.secondName, Candidate.numberOfVotes) \
        .join(Candidate).filter(ElectionList.elections_id == id).all()
    return votes

def get_candidates(id):
    # get all candidates from lists registered to given election id
    session = Session1()
    num_votes = session.query(Elections.votesToUse).filter(Elections.id == id).scalar()
    candidates = session.query(ElectionList.id, ElectionList.listName, Candidate.id, Candidate.firstName, Candidate.secondName)\
        .join(Candidate).filter(ElectionList.elections_id == id).order_by(ElectionList.listName).all()
    session.close()
    return num_votes, candidates


def close(id):
    # set elections_state to "closed" and return candidates with number of votes
    session = Session1()
    votes = count_votes(id)
    election = session.query(Elections).filter_by(id=id)
    election.update({'electionsState': 'closed'})
    session.commit()
    session.close()
    return votes


def delete(id):
    # delete the election code with given id
    session = Session1()
    session.query(Elections).filter_by(id=id).delete()
    session.commit()
    session.close()
