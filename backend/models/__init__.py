from flask_sqlalchemy import SQLAlchemy

# Initializing  database instance
db = SQLAlchemy()

# import models 
from .freelancer import Freelancer