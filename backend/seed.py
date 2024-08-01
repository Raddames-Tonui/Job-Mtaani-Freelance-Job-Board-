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
        # Reset the database
        db.drop_all()
        db.create_all()
        print("Seeding data...")

        # Sample user data
        user_data = {
            "admins": {
                "count": 6,
                "password": "admin",
                "is_admin": True,
                "is_freelancer": False,
                "is_client": False
            },
            "freelancers": {
                "count": 5,
                "password": "freelancerpass",
                "is_admin": False,
                "is_freelancer": True,
                "is_client": False
            },
            "clients": {
                "count": 3,
                "password": "clientpass",
                "is_admin": False,
                "is_freelancer": False,
                "is_client": True
            }
        }

        # Create and add users
        for role, data in user_data.items():
            for _ in range(data["count"]):
                user = User(
                    username=fake.user_name(),
                    firstname=fake.first_name(),  # Adding firstname
                    lastname=fake.last_name(),    # Adding lastname
                    email=fake.email(),
                    password_hash=generate_password_hash(data["password"]),
                    is_admin=data["is_admin"],
                    is_freelancer=data["is_freelancer"],
                    is_client=data["is_client"],
                    skills=fake.text(),
                    avatar=fake.image_url(),
                    experience=fake.text()
                )
                try:
                    db.session.add(user)
                    db.session.commit()
                except IntegrityError:
                    db.session.rollback()
                    print(f"User with email {user.email} already exists")

        # Sample job postings
        for _ in range(5):
            job_posting = JobPosting(
                title=fake.job(),
                description=fake.text(),
                requirements=fake.text(),
                client_id=random.randint(1, 6)  # Assuming user IDs are 1 through 6
            )
            db.session.add(job_posting)
            db.session.commit()

        # Sample proposals
        for num in range(1, 6):
            proposal = Proposal(
                content=fake.text(),
                freelancer_id=random.randint(1, 6),
                job_posting_id=num
            )
            db.session.add(proposal)
            db.session.commit()

        # Sample payments
        for num in range(1, 6):
            payment = Payment(
                amount=float(num * 100),
                client_id=3,  # Assuming client ID is 3
                freelancer_id=random.randint(1, 6),
                status=random.choice(["pending", "completed"])
            )
            db.session.add(payment)
            db.session.commit()

        # Sample messages
        for _ in range(10):
            message = Message(
                sender_id=random.randint(1, 6),
                receiver_id=3,  # Assuming receiver ID is 3
                content=fake.text()
            )
            db.session.add(message)
            db.session.commit()

        # Sample projects
        for num in range(1, 6):
            project = Project(
                title=fake.catch_phrase(),
                description=fake.text(),
                client_id=3,  # Assuming client ID is 3
                freelancer_id=random.randint(1, 6),
                status=random.choice(["ongoing", "completed"]),
                deadline=fake.date_this_year()
            )
            db.session.add(project)
            db.session.commit()

        # Sample milestones
        for num in range(1, 6):
            milestone = Milestone(
                project_id=num,
                title=fake.bs(),
                description=fake.text(),
                due_date=fake.date_this_year(),
                completed=random.choice([True, False])
            )
            db.session.add(milestone)
            db.session.commit()

        # Sample ratings
        for num in range(1, 6):
            rating = Rating(
                user_id=random.randint(1, 6),
                rater_id=3,  # Assuming rater ID is 3
                score=random.randint(1, 5),
                review=fake.text()
            )
            db.session.add(rating)
            db.session.commit()

        print("Database seeded!")

if __name__ == "__main__":
    seed_database()
