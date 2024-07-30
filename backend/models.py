from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

# Client Model
class Client(db.Model, SerializerMixin):
    __tablename__ = "clients"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    business_description = db.Column(db.String)
    rating = db.Column(db.Float, default=0.0)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "business_description": self.business_description,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
    
    def __repr__(self):
        return f"<Client(name='{self.name}')>"

# Freelancer Model
class Freelancer(db.Model, SerializerMixin):
    __tablename__ = "freelancers"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    skills = db.Column(db.String)
    experience = db.Column(db.String)
    rating = db.Column(db.Float, default=0.0)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "skills": self.skills,
            "experience": self.experience,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
    
    def __repr__(self):
        return f"<Freelancer(name='{self.name}')>"

# Administrator Model
class Administrator(db.Model, SerializerMixin):
    __tablename__ = "administrators"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "role": self.role,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
    
    def __repr__(self):
        return f"<Administrator(name='{self.name}', role='{self.role}')>"
