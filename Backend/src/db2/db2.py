from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


db_uri = 'mysql+mysqlconnector://kozusze1:LKpM7LsMKhYaSgZY@mysql.agh.edu.pl:3306/kozusze1'
engine2 = create_engine(db_uri)
Session2 = sessionmaker(bind=engine2)
