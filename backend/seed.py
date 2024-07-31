#!/usr/bin/env python3

from app import app, db
from models import User, JobPosting, Proposal, Payment, Message, Project, Milestone, Rating
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash
from datetime import datetime

# Create a function to seed the database
def seed_database():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        print("Seeding data...")

        # Sample users
        users = [
            {
                "username": "admin",
                "email": "admin@example.com",
                "password": "adminpass",
                "is_admin": True,
                "is_freelancer": False,
                "is_client": False
            },
            {
                "username": "freelancer1",
                "email": "freelancer1@example.com",
                "password": "freelancerpass",
                "is_admin": False,
                "is_freelancer": True,
                "is_client": False
            },
            {
                "username": "client1",
                "email": "client1@example.com",
                "password": "clientpass",
                "is_admin": False,
                "is_freelancer": False,
                "is_client": True
            }
        ]

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

        # Sample job postings
        job_postings = [
            {
                "title": "Web Development Project",
                "description": "Need a website built from scratch.",
                "requirements": "HTML, CSS, JavaScript",
                "client_id": 3  # Assume this user ID exists
            },
            {
                "title": "Mobile App Development",
                "description": "Develop a mobile app for iOS and Android.",
                "requirements": "React Native, Firebase",
                "client_id": 3  # Assume this user ID exists
            }
        ]

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

        # Sample proposals
        proposals = [
            {
                "content": "I can build the website for you.",
                "freelancer_id": 2,  # Assume this user ID exists
                "job_posting_id": 1  # Assume this job posting ID exists
            },
            {
                "content": "I have experience in mobile app development.",
                "freelancer_id": 2,  # Assume this user ID exists
                "job_posting_id": 2  # Assume this job posting ID exists
            }
        ]

        # Add sample proposals to the database
        for proposal_data in proposals:
            proposal = Proposal(
                content=proposal_data["content"],
                freelancer_id=proposal_data["freelancer_id"],
                job_posting_id=proposal_data["job_posting_id"]
            )
            db.session.add(proposal)
            db.session.commit()

        # Sample payments
        payments = [
            {
                "amount": 500.0,
                "client_id": 3,  # Assume this user ID exists
                "freelancer_id": 2,  # Assume this user ID exists
                "status": "pending"
            },
            {
                "amount": 1000.0,
                "client_id": 3,  # Assume this user ID exists
                "freelancer_id": 2,  # Assume this user ID exists
                "status": "completed"
            }
        ]

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

        # Sample messages
        messages = [
            {
                "sender_id": 2,  # Assume this user ID exists
                "receiver_id": 3,  # Assume this user ID exists
                "content": "I am interested in your project."
            },
            {
                "sender_id": 3,  # Assume this user ID exists
                "receiver_id": 2,  # Assume this user ID exists
                "content": "Thank you for your interest. Can you send me more details?"
            }
        ]

        # Add sample messages to the database
        for message_data in messages:
            message = Message(
                sender_id=message_data["sender_id"],
                receiver_id=message_data["receiver_id"],
                content=message_data["content"]
            )
            db.session.add(message)
            db.session.commit()

        # Sample projects
        projects = [
            {
                "title": "Website Development",
                "description": "Create a new website for the client.",
                "client_id": 3,  # Assume this user ID exists
                "freelancer_id": 2,  # Assume this user ID exists
                "status": "ongoing",
                "deadline": datetime(2024, 12, 31)
            }
        ]

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

        # Sample milestones
        milestones = [
            {
                "project_id": 1,  # Assume this project ID exists
                "title": "Design Phase",
                "description": "Complete the design of the website.",
                "due_date": datetime(2024, 8, 31),
                "completed": False
            },
            {
                "project_id": 1,  # Assume this project ID exists
                "title": "Development Phase",
                "description": "Complete the development of the website.",
                "due_date": datetime(2024, 11, 30),
                "completed": False
            }
        ]

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

        # Sample ratings
        ratings = [
            {
                "user_id": 2,  # Assume this user ID exists
                "rater_id": 3,  # Assume this user ID exists
                "score": 5,
                "review": "Excellent work!"
            }
        ]

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
