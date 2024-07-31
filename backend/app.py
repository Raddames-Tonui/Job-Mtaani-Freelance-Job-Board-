#!/usr/bin/env python3

from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User, JobPosting, Proposal, Payment, Message, Project, Milestone, Rating

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
CORS(app)


@app.route('/')
def index():
    return 'Welcome to the Job Board API!'

# ================================ USERS =================================

# Route to get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200


# Route to create a user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not all(key in data for key in ('username', 'email', 'password_hash')):
        abort(400, description="Invalid input")

    try:
        user = User(
            username=data['username'],
            email=data['email'],
            password_hash=data['password_hash'],
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
    except ValueError as e:
        abort(400, description=str(e))



# Route to get a single user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

# Route to update a user
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

    try:
        user.validate()
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except ValueError as e:
        abort(400, description=str(e))

# Route to delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200


# ================================ JOB POSTINGS ============================

# Route to create a job posting
@app.route('/jobpostings', methods=['POST'])
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

# Route to get all job postings
@app.route('/jobpostings', methods=['GET'])
def get_job_postings():
    job_postings = JobPosting.query.all()
    return jsonify([job_posting.to_dict() for job_posting in job_postings]), 200

# Route to get a single job posting by ID
@app.route('/jobpostings/<int:job_posting_id>', methods=['GET'])
def get_job_posting(job_posting_id):
    job_posting = JobPosting.query.get_or_404(job_posting_id)
    return jsonify(job_posting.to_dict()), 200

# Route to update a job posting
@app.route('/jobpostings/<int:job_posting_id>', methods=['PUT'])
def update_job_posting(job_posting_id):
    data = request.get_json()
    job_posting = JobPosting.query.get_or_404(job_posting_id)

    job_posting.title = data.get('title', job_posting.title)
    job_posting.description = data.get('description', job_posting.description)
    job_posting.requirements = data.get('requirements', job_posting.requirements)
    job_posting.client_id = data.get('client_id', job_posting.client_id)

    db.session.commit()
    return jsonify(job_posting.to_dict()), 200

# Route to delete a job posting
@app.route('/jobpostings/<int:job_posting_id>', methods=['DELETE'])
def delete_job_posting(job_posting_id):
    job_posting = JobPosting.query.get_or_404(job_posting_id)
    db.session.delete(job_posting)
    db.session.commit()
    return jsonify({"message": "Job posting deleted"}), 200


# ================================ PROPOSALS ================================

# Route to create a proposal
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

# Route to get all proposals
@app.route('/proposals', methods=['GET'])
def get_proposals():
    proposals = Proposal.query.all()
    return jsonify([proposal.to_dict() for proposal in proposals]), 200

# Route to get a single proposal by ID
@app.route('/proposals/<int:proposal_id>', methods=['GET'])
def get_proposal(proposal_id):
    proposal = Proposal.query.get_or_404(proposal_id)
    return jsonify(proposal.to_dict()), 200

# Route to update a proposal
@app.route('/proposals/<int:proposal_id>', methods=['PUT'])
def update_proposal(proposal_id):
    data = request.get_json()
    proposal = Proposal.query.get_or_404(proposal_id)

    proposal.content = data.get('content', proposal.content)
    proposal.freelancer_id = data.get('freelancer_id', proposal.freelancer_id)
    proposal.job_posting_id = data.get('job_posting_id', proposal.job_posting_id)

    db.session.commit()
    return jsonify(proposal.to_dict()), 200

# Route to delete a proposal
@app.route('/proposals/<int:proposal_id>', methods=['DELETE'])
def delete_proposal(proposal_id):
    proposal = Proposal.query.get_or_404(proposal_id)
    db.session.delete(proposal)
    db.session.commit()
    return jsonify({"message": "Proposal deleted"}), 200


# ================================ PAYMENTS ================================

# Route to create a payment
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

# Route to get all payments
@app.route('/payments', methods=['GET'])
def get_payments():
    payments = Payment.query.all()
    return jsonify([payment.to_dict() for payment in payments]), 200

# Route to get a single payment by ID
@app.route('/payments/<int:payment_id>', methods=['GET'])
def get_payment(payment_id):
    payment = Payment.query.get_or_404(payment_id)
    return jsonify(payment.to_dict()), 200

# Route to update a payment
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

# Route to delete a payment
@app.route('/payments/<int:payment_id>', methods=['DELETE'])
def delete_payment(payment_id):
    payment = Payment.query.get_or_404(payment_id)
    db.session.delete(payment)
    db.session.commit()
    return jsonify({"message": "Payment deleted"}), 200


# ================================ MESSAGES ================================

# Route to create a message
@app.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    if not data or not all(key in data for key in ('sender_id', 'receiver_id', 'content')):
        abort(400, description="Invalid input")

    message = Message(
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        content=data['content']
    )
    db.session.add(message)
    db.session.commit()
    return jsonify(message.to_dict()), 201

# Route to get all messages
@app.route('/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    return jsonify([message.to_dict() for message in messages]), 200

# Route to get a single message by ID
@app.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = Message.query.get_or_404(message_id)
    return jsonify(message.to_dict()), 200

# Route to update a message
@app.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    data = request.get_json()
    message = Message.query.get_or_404(message_id)

    message.content = data.get('content', message.content)

    db.session.commit()
    return jsonify(message.to_dict()), 200

# Route to delete a message
@app.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Message.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message deleted"}), 200


# ================================ PROJECTS ================================

# Route to create a project
@app.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    if not data or not all(key in data for key in ('title', 'description', 'client_id', 'freelancer_id', 'status', 'deadline')):
        abort(400, description="Invalid input")

    project = Project(
        title=data['title'],
        description=data['description'],
        client_id=data['client_id'],
        freelancer_id=data['freelancer_id'],
        status=data['status'],
        deadline=data['deadline']
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201

# Route to get all projects
@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects]), 200

# Route to get a single project by ID
@app.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict()), 200

# Route to update a project
@app.route('/projects/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    data = request.get_json()
    project = Project.query.get_or_404(project_id)

    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.client_id = data.get('client_id', project.client_id)
    project.freelancer_id = data.get('freelancer_id', project.freelancer_id)
    project.status = data.get('status', project.status)
    project.deadline = data.get('deadline', project.deadline)

    db.session.commit()
    return jsonify(project.to_dict()), 200

# Route to delete a project
@app.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted"}), 200


# ================================ MILESTONES ================================

# Route to create a milestone
@app.route('/milestones', methods=['POST'])
def create_milestone():
    data = request.get_json()
    if not data or not all(key in data for key in ('project_id', 'title', 'description', 'due_date')):
        abort(400, description="Invalid input")

    milestone = Milestone(
        project_id=data['project_id'],
        title=data['title'],
        description=data['description'],
        due_date=data['due_date'],
        completed=data.get('completed', False)
    )
    db.session.add(milestone)
    db.session.commit()
    return jsonify(milestone.to_dict()), 201

# Route to get all milestones
@app.route('/milestones', methods=['GET'])
def get_milestones():
    milestones = Milestone.query.all()
    return jsonify([milestone.to_dict() for milestone in milestones]), 200

# Route to get a single milestone by ID
@app.route('/milestones/<int:milestone_id>', methods=['GET'])
def get_milestone(milestone_id):
    milestone = Milestone.query.get_or_404(milestone_id)
    return jsonify(milestone.to_dict()), 200

# Route to update a milestone
@app.route('/milestones/<int:milestone_id>', methods=['PUT'])
def update_milestone(milestone_id):
    data = request.get_json()
    milestone = Milestone.query.get_or_404(milestone_id)

    milestone.title = data.get('title', milestone.title)
    milestone.description = data.get('description', milestone.description)
    milestone.due_date = data.get('due_date', milestone.due_date)
    milestone.completed = data.get('completed', milestone.completed)

    db.session.commit()
    return jsonify(milestone.to_dict()), 200

# Route to delete a milestone
@app.route('/milestones/<int:milestone_id>', methods=['DELETE'])
def delete_milestone(milestone_id):
    milestone = Milestone.query.get_or_404(milestone_id)
    db.session.delete(milestone)
    db.session.commit()
    return jsonify({"message": "Milestone deleted"}), 200


# ================================ RATINGS ================================

# Route to create a rating
@app.route('/ratings', methods=['POST'])
def create_rating():
    data = request.get_json()
    if not data or not all(key in data for key in ('user_id', 'rater_id', 'score')):
        abort(400, description="Invalid input")

    rating = Rating(
        user_id=data['user_id'],
        rater_id=data['rater_id'],
        score=data['score'],
        review=data.get('review')
    )
    db.session.add(rating)
    db.session.commit()
    return jsonify(rating.to_dict()), 201

# Route to get all ratings
@app.route('/ratings', methods=['GET'])
def get_ratings():
    ratings = Rating.query.all()
    return jsonify([rating.to_dict() for rating in ratings]), 200

# Route to get a single rating by ID
@app.route('/ratings/<int:rating_id>', methods=['GET'])
def get_rating(rating_id):
    rating = Rating.query.get_or_404(rating_id)
    return jsonify(rating.to_dict()), 200

# Route to update a rating
@app.route('/ratings/<int:rating_id>', methods=['PUT'])
def update_rating(rating_id):
    data = request.get_json()
    rating = Rating.query.get_or_404(rating_id)

    rating.user_id = data.get('user_id', rating.user_id)
    rating.rater_id = data.get('rater_id', rating.rater_id)
    rating.score = data.get('score', rating.score)
    rating.review = data.get('review', rating.review)

    db.session.commit()
    return jsonify(rating.to_dict()), 200

# Route to delete a rating
@app.route('/ratings/<int:rating_id>', methods=['DELETE'])
def delete_rating(rating_id):
    rating = Rating.query.get_or_404(rating_id)
    db.session.delete(rating)
    db.session.commit()
    return jsonify({"message": "Rating deleted"}), 200




if __name__ == "__main__":
    app.run(debug=True, port=5555)
