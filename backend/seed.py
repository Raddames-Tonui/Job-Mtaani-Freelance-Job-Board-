#!/usr/bin/env python3

from app import app, db
from models import User, JobPosting, Proposal, Payment, Message, Project, Milestone, Rating
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash
from datetime import datetime
from faker import Faker
import random

fake = Faker()

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Seeding data...")

        # Generate sample users
        users = []
        for _ in range(6):  # Admins
            users.append({
                "username": fake.user_name(),
                "email": fake.email(),
                "password": "adminpass",
                "is_admin": True,
                "is_freelancer": False,
                "is_client": False
            })
        for _ in range(5):  # Freelancers
            users.append({
                "username": fake.user_name(),
                "email": fake.email(),
                "password": "freelancerpass",
                "is_admin": False,
                "is_freelancer": True,
                "is_client": False
            })
        for _ in range(3):  # Clients
            users.append({
                "username": fake.user_name(),
                "email": fake.email(),
                "password": "clientpass",
                "is_admin": False,
                "is_freelancer": False,
                "is_client": True
            })

        # Add sample users to the database
        for user_data in users:
            hashed_password = generate_password_hash(user_data["password"])
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password_hash=hashed_password,
                is_admin=user_data["is_admin"],
                is_freelancer=user_data["is_freelancer"],
                is_client=user_data["is_client"]
            )
            try:
                db.session.add(user)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print(f"User with email {user_data['email']} already exists")

        # Generate sample job postings
        job_postings = []
        for _ in range(5):
            job_postings.append({
                "title": fake.job(),
                "description": fake.text(),
                "requirements": fake.text(),
                "client_id": 3
            })

        # Add sample job postings to the database
        for job_posting_data in job_postings:
            job_posting = JobPosting(
                title=job_posting_data["title"],
                description=job_posting_data["description"],
                requirements=job_posting_data["requirements"],
                client_id=job_posting_data["client_id"]
            )
            db.session.add(job_posting)
            db.session.commit()

        # Generate sample proposals
        proposals = []
        for num in range(1, 6):
            proposals.append({
                "content": fake.text(),
                "freelancer_id": random.randint(1, 5),
                "job_posting_id": num
            })

        # Add sample proposals to the database
        for proposal_data in proposals:
            proposal = Proposal(
                content=proposal_data["content"],
                freelancer_id=proposal_data["freelancer_id"],
                job_posting_id=proposal_data["job_posting_id"]
            )
            db.session.add(proposal)
            db.session.commit()

        # Generate sample payments
        payments = []
        for num in range(1, 6):
            payments.append({
                "amount": float(num * 100),
                "client_id": 3,
                "freelancer_id": random.randint(1, 5),
                "status": random.choice(["pending", "completed"])
            })

        # Add sample payments to the database
        for payment_data in payments:
            payment = Payment(
                amount=payment_data["amount"],
                client_id=payment_data["client_id"],
                freelancer_id=payment_data["freelancer_id"],
                status=payment_data["status"]
            )
            db.session.add(payment)
            db.session.commit()

        # Generate sample messages
        messages = []
        for _ in range(10):
            messages.append({
                "sender_id": random.randint(1, 5),
                "receiver_id": 3,
                "content": fake.text()
            })

        # Add sample messages to the database
        for message_data in messages:
            message = Message(
                sender_id=message_data["sender_id"],
                receiver_id=message_data["receiver_id"],
                content=message_data["content"]
            )
            db.session.add(message)
            db.session.commit()

        # Generate sample projects
        projects = []
        for num in range(1, 6):
            projects.append({
                "title": fake.catch_phrase(),
                "description": fake.text(),
                "client_id": 3,
                "freelancer_id": random.randint(1, 5),
                "status": random.choice(["ongoing", "completed"]),
                "deadline": fake.date_this_year()
            })

        # Add sample projects to the database
        for project_data in projects:
            project = Project(
                title=project_data["title"],
                description=project_data["description"],
                client_id=project_data["client_id"],
                freelancer_id=project_data["freelancer_id"],
                status=project_data["status"],
                deadline=project_data["deadline"]
            )
            db.session.add(project)
            db.session.commit()

        # Generate sample milestones
        milestones = []
        for num in range(1, 6):
            milestones.append({
                "project_id": num,
                "title": fake.bs(),
                "description": fake.text(),
                "due_date": fake.date_this_year(),
                "completed": random.choice([True, False])
            })

        # Add sample milestones to the database
        for milestone_data in milestones:
            milestone = Milestone(
                project_id=milestone_data["project_id"],
                title=milestone_data["title"],
                description=milestone_data["description"],
                due_date=milestone_data["due_date"],
                completed=milestone_data["completed"]
            )
            db.session.add(milestone)
            db.session.commit()

        # Generate sample ratings
        ratings = []
        for num in range(1, 6):
            ratings.append({
                "user_id": random.randint(1, 5),
                "rater_id": 3,
                "score": random.randint(1, 5),
                "review": fake.text()
            })

        # Add sample ratings to the database
        for rating_data in ratings:
            rating = Rating(
                user_id=rating_data["user_id"],
                rater_id=rating_data["rater_id"],
                score=rating_data["score"],
                review=rating_data["review"]
            )
            db.session.add(rating)
            db.session.commit()

        print("Database seeded!")

if __name__ == "__main__":
    seed_database()
