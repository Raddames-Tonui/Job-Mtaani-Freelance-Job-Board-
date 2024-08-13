from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData , UniqueConstraint
from sqlalchemy_serializer import SerializerMixin

# Define metadata naming conventions
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

# Initialize SQLAlchemy
db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    avatar = db.Column(db.String(150))

    is_admin = db.Column(db.Boolean, default=False)
    is_freelancer = db.Column(db.Boolean, default=False)
    is_client = db.Column(db.Boolean, default=False)
    # Freelancer
    skills = db.Column(db.String(200))
    experience = db.Column(db.String(10))
    education = db.Column(db.String(10))
    location = db.Column(db.String(100))
    # Client
    about = db.Column(db.Text)
    needs = db.Column(db.Text)

    ratings = db.relationship('Rating', backref='user', lazy=True, foreign_keys='Rating.user_id', cascade="all, delete-orphan")
    projects_for_client = db.relationship('Project', foreign_keys='Project.client_id', backref='client', cascade="all, delete-orphan")
    projects_for_freelancer = db.relationship('Project', foreign_keys='Project.freelancer_id', backref='freelancer')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def validate(self):
        if len(self.username) < 3:
            raise ValueError("Username must be at least 3 characters long.")
        if len(self.password_hash) < 3:
            raise ValueError("Password must be at least 3 characters long.")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,            
            "email": self.email,
            "avatar": self.avatar,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "is_admin": self.is_admin,
            "is_freelancer": self.is_freelancer,
            "is_client": self.is_client,
            "skills": self.skills,
            "experience": self.experience,
            "education": self.education,
            "location": self.location,
            "about": self.about,
            "needs": self.needs
        }

    def __repr__(self):
        return f"<User(username='{self.username}')>"


class JobPosting(db.Model, SerializerMixin):
    __tablename__ = "job_postings"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    tags = db.Column(db.String(200))
    role = db.Column(db.String(100))
    min_salary = db.Column(db.Numeric(10))
    max_salary = db.Column(db.Numeric(10))
    salary_type = db.Column(db.String(50))
    education = db.Column(db.String(100))
    experience = db.Column(db.String(50))
    job_type = db.Column(db.String(50))
    vacancies = db.Column(db.Integer)
    expiration_date = db.Column(db.String(50))
    job_level = db.Column(db.String(50))
    description = db.Column(db.Text, nullable=False)
    responsibilities = db.Column(db.Text)
    requirements = db.Column(db.Text)
    location = db.Column(db.String(100))
    experience_level = db.Column(db.String(50))

    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    client = db.relationship('User', backref=db.backref('job_postings', lazy=True))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "tags": self.tags,
            "role": self.role,
            "min_salary": float(self.min_salary) if self.min_salary is not None else None,
            "max_salary": float(self.max_salary) if self.max_salary is not None else None,
            "salary_type": self.salary_type,
            "education": self.education,
            "experience": self.experience,
            "job_type": self.job_type,
            "vacancies": self.vacancies,
            "expiration_date": self.expiration_date,
            "job_level": self.job_level,
            "description": self.description,
            "responsibilities": self.responsibilities,
            "requirements": self.requirements,
            "experience_level": self.experience_level,
            "location": self.location,
            "client_id": self.client_id,
            "client": self.client.to_dict(),

            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"<JobPosting(title='{self.title}')>"

    

class Proposal(db.Model, SerializerMixin):
    __tablename__ = "proposals"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False, server_default='pending')
    cover_letter = db.Column(db.String(255), nullable=True)

    freelancer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_posting_id = db.Column(db.Integer, db.ForeignKey('job_postings.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    job_posting = db.relationship('JobPosting', backref=db.backref('proposals', lazy=True, cascade="all, delete-orphan"))
    freelancer = db.relationship('User', foreign_keys=[freelancer_id], backref=db.backref('proposals', lazy=True, cascade="all, delete-orphan"))
    client = db.relationship('User', foreign_keys=[client_id])

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "status": self.status,
            "cover_letter": self.cover_letter,
            "freelancer_id": self.freelancer_id,
            "job_posting_id": self.job_posting_id,
            "client_id": self.client_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "freelancer": self.freelancer.to_dict() if self.freelancer else None,
            "job_posting": self.job_posting.to_dict() if self.job_posting else None,
            "client": self.client.to_dict() if self.client else None
        }

    def __repr__(self):
        return f"<Proposal(id='{self.id}', status='{self.status}')>"

class AcceptedFreelancer(db.Model, SerializerMixin):
    __tablename__ = "accepted_freelancers"

    id = db.Column(db.Integer, primary_key=True)
    freelancer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_posting_id = db.Column(db.Integer, db.ForeignKey('job_postings.id'), nullable=True)

    freelancer = db.relationship('User', foreign_keys=[freelancer_id], backref=db.backref('accepted_projects', lazy=True))
    client = db.relationship('User', foreign_keys=[client_id])
    job_posting = db.relationship('JobPosting', backref=db.backref('accepted_freelancers', lazy=True))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Unique constraint to prevent duplicate freelancer-client combinations
    __table_args__ = (
        UniqueConstraint('freelancer_id', 'client_id', name='unique_freelancer_client'),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "freelancer_id": self.freelancer_id,
            "client_id": self.client_id,
            "job_posting_id": self.job_posting_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"<AcceptedFreelancer(freelancer_id='{self.freelancer_id}', client_id='{self.client_id}', job_posting_id='{self.job_posting_id}')>"
    
    
class Payment(db.Model, SerializerMixin):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    freelancer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)  # e.g., 'pending', 'completed'

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "client_id": self.client_id,
            "freelancer_id": self.freelancer_id,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"<Payment(id='{self.id}', status='{self.status}')>"

class Usermessage(db.Model, SerializerMixin):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"<Usermessage(id='{self.id}')>"
    
class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False)  # 'ongoing', 'completed', 'cancelled', 'Not Started'
    deadline = db.Column(db.String(50), nullable=False)

    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    freelancer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "client_id": self.client_id,
            "freelancer_id": self.freelancer_id,
            "client": {
                "firstname": self.client.firstname,
                "lastname": self.client.lastname
            } if self.client else None,
            "freelancer": {
                "firstname": self.freelancer.firstname,
                "lastname": self.freelancer.lastname,
                "username": self.freelancer.username
            } if self.freelancer else None,
            "status": self.status,
            "deadline": self.deadline,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
     
    def __repr__(self):
        return f"<Project(title='{self.title}', status='{self.status}')>"

class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 
    rater_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    score = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text)
    review_type = db.Column(db.String(50), nullable=False)  # e.g., 'client' or 'freelancer'

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "rater_id": self.rater_id,
            "score": self.score,
            "review": self.review,
            "review_type": self.review_type,  
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"<Rating(id='{self.id}', score='{self.score}', review_type='{self.review_type}')>"
