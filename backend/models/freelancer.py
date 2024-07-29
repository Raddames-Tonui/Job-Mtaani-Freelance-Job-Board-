from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import func

db = SQLAlchemy()

class Freelancer(db.Model, SerializerMixin):
    __tablename__ = 'freelancers'

    id = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String(84), unique=True, nullable=False)
    Firstname = db.Column(db.String(20), nullable=False)
    Lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    skills = db.Column(db.String(255), nullable=True)
    experience = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Float, default=0.0)
    reviews = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, onupdate=func.now(), nullable=False)

    def __init__(self, Username, Firstname, Lastname, email, password):
        self.Username = Username
        self.Firstname = Firstname
        self.Lastname = Lastname
        self.email = email
        self.password = password

    # for debugging purposes
    def __repr__(self):
        return f'<Freelancer {self.Username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'Username': self.Username,
            'Firstname': self.Firstname,
            'Lastname': self.Lastname,
            'email': self.email,
            'skills': self.skills,
            'experience': self.experience,
            'rating': self.rating,
            'reviews': self.reviews,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
