from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from Backend.src.base import Base
from Backend.src.db1.db1 import Session1
import datetime


class ElectionList(Base):
    __tablename__ = 'electionList'
    id = Column(Integer, primary_key=True)
    elections_id = Column(Integer, ForeignKey('elections.id'))
    listName = Column(String, nullable=False)
    registrationDate = Column(DateTime)
    candidates = relationship("Candidate", backref='list')

    def __init__(self, listName):
        self.listName = listName

    def __repr__(self):
        return f"<List name: {self.listName},id : {self.id}, election: {self.elections_id}, registration: {self.registrationDate}>"


def get_all():
    # get all election Lists
    session = Session1()
    electionLists = session.query(ElectionList).all()
    return electionLists


def get(elections_id, listName):
    # get the election List with given election_id and listName
    session = Session1()
    electionList = session.query(ElectionList).filter_by(elections_id=elections_id, listName=listName).scalar()
    return electionList


def create(listName):
    # create an electionList with given name
    session = Session1()
    exists = session.query(session.query(ElectionList).filter_by(listName=listName).exists()).scalar()
    if (exists):
        return 0
    else:
        new_list = ElectionList(listName)
        session.add(new_list)
        session.commit()
        session.close()
        return 1


def register(id, elections_id):
    # add election_id and add now() as registrationDate
    session = Session1()
    election = session.query(ElectionList).filter_by(id=id)
    election.update({'elections_id': elections_id, 'registrationDate': datetime.datetime.now()})
    session.commit()
    session.close()


def delete(id):
    # get the election List with given id
    session = Session1()
    session.query(ElectionList).filter_by(id=id).delete()
    session.commit()
    session.close()
