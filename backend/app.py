#!/usr/bin/env python3

import random
from datetime import timedelta, datetime
from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_mail import Mail, Message  


from models import db, User, JobPosting, Proposal, Payment, Usermessage, Project, Milestone, Rating

# Initialize Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "$hhjd4q%h%$#@%ggh^#7&893" + str(random.randint(1, 1000000))
app.config["JWT_SECRET_KEY"] = "a44u5$%*47992n3i*#*#99s29" + str(random.randint(1, 100000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.json.compact = False

# Mailtrap configuration
app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = '2883ede72140a2'
app.config['MAIL_PASSWORD'] = 'f43cc51036c6b9'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

# Initialize extensions
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
mail = Mail(app)  # Initialize Flask-Mail

# Serializer for generating reset tokens
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# ================================ CUSTOMER SUPPORT ===================================

# =================================== MAIL TRAP =====================================================

# Route for testing Mailtrap connection
@app.route('/test-mail', methods=['GET'])
def test_mail():
    try:
        msg = Message('Test Email', sender='noreply@example.com', recipients=['test@example.com'])
        msg.body = 'This is a test email sent from Flask using Mailtrap.'
        mail.send(msg)
        return jsonify({"message": "Test email sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to send test email", "details": str(e)}), 500


@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    token = s.dumps(email, salt='password-reset-salt')
    reset_url = f'http://localhost:5173/reset-password/{token}'  # Adjust the URL to match your React frontend
    
    # Send the token to the user's email
    msg = Message('Password Reset Request', sender='noreply@example.com', recipients=[email])
    msg.body = f'Hi, to reset your password, please click the following link: {reset_url}'
    mail.send(msg)
    
    return jsonify({"message": "A password reset email has been sent"}), 200

@app.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600)
    except SignatureExpired:
        return jsonify({"message": "The token has expired"}), 400
    except BadSignature:
        return jsonify({"message": "Invalid token"}), 400

    data = request.get_json()
    new_password = data.get('new_password')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    db.session.commit()
    
    return jsonify({"message": "Password has been reset"}), 200

# ===================== AUTHENTICATION ======================
@app.route('/')
def index():
    return 'Welcome to the Job Board API!'

# Route for user login
@app.route("/login", methods=["POST"])
def login_user():
    identifier = request.json.get("identifier")
    password = request.json.get("password")

    user = User.query.filter(
        (User.email == identifier) | (User.username == identifier)
    ).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "is_admin": user.is_admin,
            "is_client": user.is_client,
            "is_freelancer": user.is_freelancer
        }), 200

    return jsonify({"message": "Check your username or password"}), 401


# Route for getting current user
@app.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    try:
        current_user_id = get_jwt_identity()
        user = db.session.get(User, current_user_id)  

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
    
# Token blacklist to manage token invalidation
BLACKLIST = set()

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success": "Successfully logged out"}), 200


# ================================ USERS ================================

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not all(key in data for key in ('username', 'email', 'password')):
        abort(400, description="Invalid input")

    is_admin = data.get('is_admin', False)
    is_freelancer = data.get('is_freelancer', False)
    is_client = data.get('is_client', False)

    if not is_admin and not is_freelancer and not is_client:
        is_client = True

    try:
        user = User(
            username=data['username'],
            firstname=data.get('firstname', ''), 
            lastname=data.get('lastname', ''),
            email=data['email'],
            password_hash=bcrypt.generate_password_hash(data['password']).decode('utf-8'),                
            is_admin=is_admin,
            is_freelancer=is_freelancer,
            is_client=is_client,
            skills=data.get('skills', ''),
            experience=data.get('experience', ''),
            about=data.get('about', ''), 
            needs=data.get('needs', '')  
        )
        user.validate()  
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except ValueError as e:
        abort(400, description=str(e))

# Get a single user
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict()), 200

# Update a user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.is_admin = data.get('is_admin', user.is_admin)
    user.is_freelancer = data.get('is_freelancer', user.is_freelancer)
    user.is_client = data.get('is_client', user.is_client)
    user.skills = data.get('skills', user.skills)
    user.experience = data.get('experience', user.experience)
    user.about = data.get('about', user.about) 
    user.needs = data.get('needs', user.needs) 

    db.session.commit()
    return jsonify(user.to_dict()), 200

# Delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

# ================================ JOB POSTINGS ======================================

# create a new job posting
@app.route('/jobpostings', methods=['POST'])
@jwt_required()
def create_job_posting():
    data = request.get_json()
    if not data or not all(key in data for key in ('title', 'description')):
        abort(400, description="Invalid input")
    # Convert expiration_date to a Python date object

    client_id = get_jwt_identity()

    # try:
    #     expiration_date = datetime.strptime(data.get('expiration_date'), '%Y-%m-%d').date()
    # except (TypeError, ValueError):
    #     return jsonify({'message': 'Invalid expiration date format. Expected YYYY-MM-DD.'}), 400
    
    # Create new job posting
    job_posting = JobPosting(
        title=data.get('title'),
        tags=data.get('tags'),
        role=data.get('role'),
        min_salary=data.get('min_salary'),
        max_salary=data.get('max_salary'),
        salary_type=data.get('salary_type'),
        education=data.get('education'),
        experience=data.get('experience'),
        job_type=data.get('job_type'),
        vacancies=data.get('vacancies'),
        expiration_date=data.get('expiration_date'),
        job_level=data.get('job_level'),
        description=data.get('description'),
        responsibilities=data.get('responsibilities'),
        location=data.get('location'),
        experience_level=data.get('experience_level'),
        client_id=client_id
    )

    db.session.add(job_posting)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create job posting.', 'error': str(e)}), 500
    
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
@jwt_required()
def update_job_posting(job_posting_id):
    data = request.get_json()
    job_posting = JobPosting.query.get_or_404(job_posting_id)

    job_posting.title = data.get('title', job_posting.title)
    job_posting.tags = data.get('tags', job_posting.tags)
    job_posting.role = data.get('role', job_posting.role)
    job_posting.min_salary = data.get('min_salary', job_posting.min_salary)
    job_posting.max_salary = data.get('max_salary', job_posting.max_salary)
    job_posting.salary_type = data.get('salary_type', job_posting.salary_type)
    job_posting.education = data.get('education', job_posting.education)
    job_posting.experience = data.get('experience', job_posting.experience)
    job_posting.job_type = data.get('job_type', job_posting.job_type)
    job_posting.vacancies = data.get('vacancies', job_posting.vacancies)
    job_posting.expiration_date = data.get('expiration_date', job_posting.expiration_date)
    job_posting.job_level = data.get('job_level', job_posting.job_level)
    job_posting.description = data.get('description', job_posting.description)
    job_posting.responsibilities = data.get('responsibilities', job_posting.responsibilities)
    job_posting.experience_level = data.get('experience_level', job_posting.experience_level)
    job_posting.location = data.get('location', job_posting.location)
    job_posting.client_id = get_jwt_identity()

    db.session.commit()
    return jsonify(job_posting.to_dict()), 200

# Route to delete a job posting
@app.route('/jobpostings/<int:job_posting_id>', methods=['DELETE'])
@jwt_required()
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

    message = Usermessage(
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
    messages = Usermessage.query.all()
    return jsonify([message.to_dict() for message in messages]), 200

# Route to get a single message by ID
@app.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = Usermessage.query.get_or_404(message_id)
    return jsonify(message.to_dict()), 200

# Route to update a message
@app.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    data = request.get_json()
    message = Usermessage.query.get_or_404(message_id)

    message.content = data.get('content', message.content)

    db.session.commit()
    return jsonify(message.to_dict()), 200

# Route to delete a message
@app.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Usermessage.query.get_or_404(message_id)
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Usermessage deleted"}), 200


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
