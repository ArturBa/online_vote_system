from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from Backend.src.base import Base
from Backend.src.db1.db1 import Session1
import random
import string


class VotingCode(Base):
    __tablename__ = 'votingCode'
    id = Column(Integer, primary_key=True)
    elections_id = Column(Integer, ForeignKey('elections.id'), nullable=False)
    pesel = Column(Integer, nullable=False)
    used = Column(Boolean, nullable=False)
    codeToVote = Column(String, nullable=False)

    def __init__(self, elections_id, pesel, code):
        self.elections_id = elections_id
        self.pesel = pesel
        self.codeToVote = code
        self.used = False

    def __repr__(self):
        return f"<code: {self.codeToVote}, elections_id: {self.elections_id}, pesel: {self.pesel}, used: {self.used} >"


def get_all():
    # get all voting_codes
    session = Session1()
    codes = session.query(VotingCode).all()
    session.close()
    return codes


def get(election_id, pesel):
    # get the voting code with given election_id and pesel
    session = Session1()
    code = session.query(VotingCode).filter_by(elections_id=election_id, pesel=pesel).scalar()
    session.close()
    return code


def create(election_id, pesel):
    # create a new voting code with given election_id, pesel and unique codeToVote
    # doesn't check if entry exists, use get() first
    session = Session1()
    chars = string.ascii_letters + string.digits
    N = 8
    while (True):
        code = ''.join(random.choice(chars) for _ in range(N))
        if session.query(VotingCode).filter_by(codeToVote=code).scalar() is None:
            break
    new_code = VotingCode(election_id, pesel, code)
    session.add(new_code)
    session.commit()
    session.close()
    return new_code


def verify(code):
    # check if given codeToVote is correct and haven't been used already
    session = Session1()
    default = "USEDCODE"
    query = session.query(VotingCode).filter_by(codeToVote=code).scalar()
    if query is None or query.used or query.codeToVote == default:
        session.close()
        return 0
    else:
        session.close()
        return 1


def use(code):
    # mark given code as used
    session = Session1()
    default = "USEDCODE"
    codeToVote = session.query(VotingCode).filter_by(codeToVote=code)
    if codeToVote.scalar() is None:
        session.close()
        return 0
    else:
        codeToVote.update({'used': True, 'codeToVote': default})
        session.commit()
        session.close()
        return 1


def delete(election_id, pesel):
    # delete the voting code with given election_id and pesel
    session = Session1()
    session.query(VotingCode).filter_by(election_id=election_id, pesel=pesel).delete()
    session.commit()
    session.close()
