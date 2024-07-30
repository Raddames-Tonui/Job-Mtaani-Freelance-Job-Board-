from flask_sqlalchemy import SQLAlchemy
# models/__init__.py

from . import Employee
from . import Onboarding
from . import Review
from . import user

# Initialize database and other configurations
from . import db

# Initializing  database instance
db = SQLAlchemy()

# import models 
from .freelancer import Freelancer