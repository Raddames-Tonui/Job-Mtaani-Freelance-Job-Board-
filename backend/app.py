#!/usr/bin/env python3

from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User, JobPosting, Proposal, Payment, Message, Project, Milestone, Rating
from flask_jwt_extended import JWTManager, create_access_token,create_refresh_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'adccb02d3e2e6a689917410cc84a940260a137c8b712b66ba4a12913047f43a0'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

app.json.compact = False
jwt = JWTManager(app)

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
CORS(app)

@app.route('/')
def index():
    return 'Welcome to the Job Board API!'

# ================================ USERS =================================

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200
#sign up
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not all(key in data for key in ('username', 'email', 'password')):
        abort(400, description="Invalid input")

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_password,
            is_admin=data.get('is_admin', False),
            is_freelancer=data.get('is_freelancer', False),
            is_client=data.get('is_client', False),
            skills=data.get('skills'),
            experience=data.get('experience')
        )
    user.validate()
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201
   #login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not all(key in data for key in ('username', 'password')):
        abort(400, description="Invalid input")

    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity={'id': user.id, 'username': user.username})
        refresh_token = create_refresh_token(identity={'id': user.id, 'username': user.username})
        return jsonify({'access_token': access_token, 'refresh_token': refresh_token}), 200
    abort(401, description="Invalid credentials")

# Authenticate user
    access_token = create_access_token(identity={'id': user.id, 'username': user.username})
    refresh_token = create_refresh_token(identity={'id': user.id, 'username': user.username})
    return {'access_token': access_token, 'refresh_token': refresh_token}

@app.route('/refresh', methods=['POST'])
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return {'access_token': new_access_token}

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200
#get user by id
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password_hash = data.get('password_hash', user.password_hash)
    user.is_admin = data.get('is_admin', user.is_admin)
    user.is_freelancer = data.get('is_freelancer', user.is_freelancer)
    user.is_client = data.get('is_client', user.is_client)
    user.skills = data.get('skills', user.skills)
    user.experience = data.get('experience', user.experience)

    user.validate()
    db.session.commit()
    return jsonify(user.to_dict()), 200
  #delete
@app.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

# ================================ JOB POSTINGS ============================

@app.route('/job_postings', methods=['POST'])
def create_job_posting():
    data = request.get_json()
    if not data or not all(key in data for key in ('title', 'description', 'client_id')):
        abort(400, description="Invalid input")

    job_posting = JobPosting(
        title=data['title'],
        description=data['description'],
        requirements=data.get('requirements'),
        client_id=data['client_id']
    )
    db.session.add(job_posting)
    db.session.commit()
    return jsonify(job_posting.to_dict()), 201

@app.route('/job_postings', methods=['GET'])
def get_job_postings():
    job_postings = JobPosting.query.all()
    return jsonify([job_posting.to_dict() for job_posting in job_postings]), 200

@app.route('/job_postings/<int:job_posting_id>', methods=['GET'])
def get_job_posting(job_posting_id):
    job_posting = JobPosting.query.get_or_404(job_posting_id)
    return jsonify(job_posting.to_dict()), 200

@app.route('/job_postings/<int:job_posting_id>', methods=['PUT'])
def update_job_posting(job_posting_id):
    data = request.get_json()
    job_posting = JobPosting.query.get_or_404(job_posting_id)

    job_posting.title = data.get('title', job_posting.title)
    job_posting.description = data.get('description', job_posting.description)
    job_posting.requirements = data.get('requirements', job_posting.requirements)
    job_posting.client_id = data.get('client_id', job_posting.client_id)

    db.session.commit()
    return jsonify(job_posting.to_dict()), 200

@app.route('/job_postings/<int:job_posting_id>', methods=['DELETE'])
def delete_job_posting(job_posting_id):
    job_posting = JobPosting.query.get_or_404(job_posting_id)
    db.session.delete(job_posting)
    db.session.commit()
    return jsonify({"message": "Job posting deleted"}), 200

# ================================ PROPOSALS ================================

@app.route('/proposals', methods=['POST'])
def create_proposal():
    data = request.get_json()
    if not data or not all(key in data for key in ('content', 'freelancer_id', 'job_posting_id')):
        abort(400, description="Invalid input")

    proposal = Proposal(
        content=data['content'],
        freelancer_id=data['freelancer_id'],
        job_posting_id=data['job_posting_id']
    )
    db.session.add(proposal)
    db.session.commit()
    return jsonify(proposal.to_dict()), 201

@app.route('/proposals', methods=['GET'])
def get_proposals():
    proposals = Proposal.query.all()
    return jsonify([proposal.to_dict() for proposal in proposals]), 200

@app.route('/proposals/<int:proposal_id>', methods=['GET'])
def get_proposal(proposal_id):
    proposal = Proposal.query.get_or_404(proposal_id)
    return jsonify(proposal.to_dict()), 200

@app.route('/proposals/<int:proposal_id>', methods=['PUT'])
def update_proposal(proposal_id):
    data = request.get_json()
    proposal = Proposal.query.get_or_404(proposal_id)

    proposal.content = data.get('content', proposal.content)
    proposal.freelancer_id = data.get('freelancer_id', proposal.freelancer_id)
    proposal.job_posting_id = data.get('job_posting_id', proposal.job_posting_id)

    db.session.commit()
    return jsonify(proposal.to_dict()), 200

@app.route('/proposals/<int:proposal_id>', methods=['DELETE'])
def delete_proposal(proposal_id):
    proposal = Proposal.query.get_or_404(proposal_id)
    db.session.delete(proposal)
    db.session.commit()
    return jsonify({"message": "Proposal deleted"}), 200

# ================================ PAYMENTS ================================

@app.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    if not data or not all(key in data for key in ('amount', 'client_id', 'freelancer_id', 'status')):
        abort(400, description="Invalid input")

    payment = Payment(
        amount=data['amount'],
        client_id=data['client_id'],
        freelancer_id=data['freelancer_id'],
        status=data['status']
    )
    db.session.add(payment)
    db.session.commit()
    return jsonify(payment.to_dict()), 201

@app.route('/payments', methods=['GET'])
def get_payments():
    payments = Payment.query.all()
    return jsonify([payment.to_dict() for payment in payments]), 200

@app.route('/payments/<int:payment_id>', methods=['GET'])
def get_payment(payment_id):
    payment = Payment.query.get_or_404(payment_id)
    return jsonify(payment.to_dict()), 200

@app.route('/payments/<int:payment_id>', methods=['PUT'])
def update_payment(payment_id):
    data = request.get_json()
    payment = Payment.query.get_or_404(payment_id)

    payment.amount = data.get('amount', payment.amount)
    payment.client_id = data.get('client_id', payment.client_id)
    payment.freelancer_id = data.get('freelancer_id', payment.freelancer_id)
    payment.status = data.get('status', payment.status)

    db.session.commit()
    return jsonify(payment.to_dict()), 200

@app.route('/payments/<int:payment_id>', methods=['DELETE'])
def delete_payment(payment_id):
    payment = Payment.query.get_or_404(payment_id)
    db.session.delete(payment)
    db.session.commit()
    return jsonify({"message": "Payment deleted"}), 200

# ================================ MESSAGES ================================

@app.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    if not data or not all(key in data for key in ('content', 'sender_id', 'receiver_id')):
        abort(400, description="Invalid input")

    message = Message(
        content=data['content'],
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id']
    )
    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict()), 201

@app.route('/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([message.to_dict() for message in messages]), 200

@app.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = Message.query.get_or_404(message_id)
    return jsonify(message.to_dict()), 200

@app.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    data = request.get_json()
    message = Message.query.get_or_404(message_id)

    message.content = data.get('content', message.content)
    message.sender_id = data.get('sender_id', message.sender_id)
    message.receiver_id = data.get('receiver_id', message.receiver_id)

    db.session.commit()
    return jsonify(message.to_dict()), 200

@app.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Message.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message deleted"}), 200

# ================================ PROJECTS ================================

@app.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    if not data or not all(key in data for key in ('title', 'description', 'client_id')):
        abort(400, description="Invalid input")

    project = Project(
        title=data['title'],
        description=data['description'],
        client_id=data['client_id']
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201

@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects]), 200

@app.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict()), 200

@app.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.get_json()
    project = Project.query.get_or_404(project_id)

    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.client_id = data.get('client_id', project.client_id)

    db.session.commit()
    return jsonify(project.to_dict()), 200

@app.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted"}), 200

# ================================ MILESTONES ================================

@app.route('/milestones', methods=['POST'])
def create_milestone():
    data = request.get_json()
    if not data or not all(key in data for key in ('title', 'description', 'project_id')):
        abort(400, description="Invalid input")

    milestone = Milestone(
        title=data['title'],
        description=data['description'],
        project_id=data['project_id']
    )
    db.session.add(milestone)
    db.session.commit()
    return jsonify(milestone.to_dict()), 201

@app.route('/milestones', methods=['GET'])
def get_milestones():
    milestones = Milestone.query.all()
    return jsonify([milestone.to_dict() for milestone in milestones]), 200

@app.route('/milestones/<int:milestone_id>', methods=['GET'])
def get_milestone(milestone_id):
    milestone = Milestone.query.get_or_404(milestone_id)
    return jsonify(milestone.to_dict()), 200

@app.route('/milestones/<int:milestone_id>', methods=['PUT'])
def update_milestone(milestone_id):
    data = request.get_json()
    milestone = Milestone.query.get_or_404(milestone_id)

    milestone.title = data.get('title', milestone.title)
    milestone.description = data.get('description', milestone.description)
    milestone.project_id = data.get('project_id', milestone.project_id)

    db.session.commit()
    return jsonify(milestone.to_dict()), 200

@app.route('/milestones/<int:milestone_id>', methods=['DELETE'])
def delete_milestone(milestone_id):
    milestone = Milestone.query.get_or_404(milestone_id)
    db.session.delete(milestone)
    db.session.commit()
    return jsonify({"message": "Milestone deleted"}), 200

# ================================ RATINGS ================================

@app.route('/ratings', methods=['POST'])
def create_rating():
    data = request.get_json()
    if not data or not all(key in data for key in ('rating', 'comment', 'user_id')):
        abort(400, description="Invalid input")

    rating = Rating(
        rating=data['rating'],
        comment=data.get('comment'),
        user_id=data['user_id']
    )
    db.session.add(rating)
    db.session.commit()
    return jsonify(rating.to_dict()), 201

@app.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = Rating.query.all()
    return jsonify([rating.to_dict() for rating in ratings]), 200

@app.route('/ratings/<int:rating_id>', methods=['GET'])
def get_rating(rating_id):
    rating = Rating.query.get_or_404(rating_id)
    return jsonify(rating.to_dict()), 200

@app.route('/ratings/<int:rating_id>', methods=['PUT'])
def update_rating(rating_id):
    data = request.get_json()
    rating = Rating.query.get_or_404(rating_id)

    rating.rating = data.get('rating', rating.rating)
    rating.comment = data.get('comment', rating.comment)
    rating.user_id = data.get('user_id', rating.user_id)

    db.session.commit()
    return jsonify(rating.to_dict()), 200

@app.route('/ratings/<int:rating_id>', methods=['DELETE'])
def delete_rating(rating_id):
    rating = Rating.query.get_or_404(rating_id)
    db.session.delete(rating)
    db.session.commit()
    return jsonify({"message": "Rating deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5555)
