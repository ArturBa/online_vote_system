from sqlalchemy import Column, Integer, String
from Backend.src.base import Base
from Backend.src.db2.db2 import Session2
from sqlalchemy.sql import exists


class Voter(Base):
    __tablename__ = 'voter'
    pesel = Column(Integer, primary_key=True)
    firstName = Column(String, nullable=False)
    secondName = Column(String, nullable=False)

    def __init__(self, pesel, firstName, secondName):
        self.pesel = pesel
        self.firstName = firstName
        self.secondName = secondName

    def __repr__(self):
        return f"<Pesel: {self.pesel}, Name: {self.firstName} {self.secondName} >"

def get_all():
    #get all voters
    session = Session2()
    voters = session.query(Voter).all()
    return  voters

def get(pesel):
    #get the voter with given pesel
    session = Session2()
    voter = session.query(Voter).filter_by(pesel=pesel).scalar()
    return  voter

def verify(pesel):
    #check if the voter with given pesel already exists in db
    session = Session2()
    exists = session.query(Voter).filter_by(pesel=pesel).scalar() is not None
    return exists

def add(pesel, first_name, second_name):
    #add a new voter with given pesel, first_name and second_name and return 1
    #or return 0 if voter with given pesel already exists
    session = Session2()
    if verify(pesel):
        return 0
    else:
        new_voter = Voter(pesel, first_name, second_name)
        session.add(new_voter)
        session.commit()
        session.close()
        return 1

def delete(pesel):
    #delete the voter with given pesel
    session = Session2()
    exists = session.query(Voter).filter_by(pesel=pesel).delete()
    session.commit()
    session.close()
