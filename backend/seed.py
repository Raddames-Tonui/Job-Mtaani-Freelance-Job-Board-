#!/usr/bin/env python3

from app import app, db
from models import User, JobPosting, Proposal, Payment, Usermessage, Project, Milestone, Rating
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
                    firstname=fake.first_name(),
                    lastname=fake.last_name(),
                    email=fake.email(),
                    password_hash=generate_password_hash(data["password"]),
                    is_admin=data["is_admin"],
                    is_freelancer=data["is_freelancer"],
                    is_client=data["is_client"],
                    skills=fake.text() if data["is_freelancer"] else None,
                    experience=fake.text() if data["is_freelancer"] else None,
                    about=fake.text() if data["is_client"] else None,
                    needs=fake.text() if data["is_client"] else None,
                    avatar=fake.image_url()
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
                tags=', '.join(fake.words(nb=3, ext_word_list=None, unique=True)),  # Convert list to comma-separated string
                role=fake.job(),
                min_salary=fake.pydecimal(left_digits=6, right_digits=2, positive=True),
                max_salary=fake.pydecimal(left_digits=6, right_digits=2, positive=True),
                salary_type=random.choice(["hourly", "monthly", "contract"]),
                education=fake.job(),
                experience=fake.job(),
                job_type=random.choice(["full-time", "part-time", "contract", "internship"]),
                vacancies=random.randint(1, 10),
                expiration_date=fake.date_between(start_date='today', end_date='+30d'),
                job_level=random.choice(["Beginner", "Intermediate", "Expert"]),
                description=fake.text(),
                responsibilities=fake.text(),
                requirements=fake.text(),
                location=fake.city(),
                experience_level=random.choice(["Entry-level", "Mid-level", "Senior-level"]),
                client_id=random.randint(1, 3)
            )
            db.session.add(job_posting)
            db.session.commit()

        # Sample payments
        for _ in range(5):
            payment = Payment(
                amount=float(random.randint(100, 1000)),
                client_id=random.randint(1, 3),
                freelancer_id=random.randint(1, 11),
                status=random.choice(["pending", "completed"])
            )
            db.session.add(payment)
            db.session.commit()

        # Sample messages
        for _ in range(10):
            message = Usermessage(
                sender_id=random.randint(1, 11),
                receiver_id=random.randint(1, 11),
                content=fake.text()
            )
            db.session.add(message)
            db.session.commit()

        # Sample projects
        for _ in range(5):
            project = Project(
                title=fake.catch_phrase(),
                description=fake.text(),
                client_id=random.randint(1, 3),
                freelancer_id=random.randint(1, 11),
                status=random.choice(["ongoing", "completed"]),
                deadline=fake.date_this_year()
            )
            db.session.add(project)
            db.session.commit()

        # Sample milestones
        for _ in range(5):
            milestone = Milestone(
                project_id=random.randint(1, 5),
                title=fake.bs(),
                description=fake.text(),
                due_date=fake.date_this_year(),
                completed=random.choice([True, False])
            )
            db.session.add(milestone)
            db.session.commit()

        # Sample ratings
        for _ in range(5):
            rating = Rating(
                user_id=random.randint(1, 11),
                rater_id=random.randint(1, 11),
                score=random.randint(1, 5),
                review=fake.text()
            )
            db.session.add(rating)
            db.session.commit()

        print("Database seeded!")

if __name__ == "__main__":
    seed_database()