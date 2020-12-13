from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


db_uri = 'mysql+mysqlconnector://kozuszek:7UFqhTSEWar8ZJ2p@mysql.agh.edu.pl:3306/kozuszek'
engine1 = create_engine(db_uri)
Session1 = sessionmaker(bind=engine1)
