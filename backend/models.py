from app import app, db
from models import Client, Freelancer, Administrator
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Seeding data...")

        # Sample clients
        clients = [
            {
                "name": "Alice Smith",
                "email": "alice@example.com",
                "password": "password123",
                "business_description": "Tech Consulting"
            },
            {
                "name": "Bob Johnson",
                "email": "bob@example.com",
                "password": "password123",
                "business_description": "Marketing Agency"
            },
            {
                "name": "Charlie Brown",
                "email": "charlie@example.com",
                "password": "password123",
                "business_description": "Graphic Design"
            }
        ]

        # Add clients
        for client_data in clients:
            hashed_password = generate_password_hash(client_data["password"])
            client = Client(
                name=client_data["name"],
                email=client_data["email"],
                password=hashed_password,
                business_description=client_data["business_description"]
            )
            try:
                db.session.add(client)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print(f"Client with email {client_data['email']} already exists")

        
        freelancers = [
            {
                "name": "Dave Wilson",
                "email": "dave@example.com",
                "password": "password123",
                "skills": "Python, Flask",
                "experience": "3 years"
            },
            {
                "name": "Eva Green",
                "email": "eva@example.com",
                "password": "password123",
                "skills": "JavaScript, React",
                "experience": "5 years"
            },
            {
                "name": "Frank White",
                "email": "frank@example.com",
                "password": "password123",
                "skills": "Graphic Design, Photoshop",
                "experience": "2 years"
            }
        ]

        
        for freelancer_data in freelancers:
            hashed_password = generate_password_hash(freelancer_data["password"])
            freelancer = Freelancer(
                name=freelancer_data["name"],
                email=freelancer_data["email"],
                password=hashed_password,
                skills=freelancer_data["skills"],
                experience=freelancer_data["experience"]
            )
            try:
                db.session.add(freelancer)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print(f"Freelancer with email {freelancer_data['email']} already exists")

        # Sample administrators
        administrators = [
            {
                "name": "Admin One",
                "email": "admin1@example.com",
                "password": "adminpass",
                "role": "superadmin"
            },
            {
                "name": "Admin Two",
                "email": "admin2@example.com",
                "password": "adminpass",
                "role": "admin"
            }
        ]

        # Add administrators
        for admin_data in administrators:
            hashed_password = generate_password_hash(admin_data["password"])
            administrator = Administrator(
                name=admin_data["name"],
                email=admin_data["email"],
                password=hashed_password,
                role=admin_data["role"]
            )
            try:
                db.session.add(administrator)
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print(f"Administrator with email {admin_data['email']} already exists")

        print("Database seeded!")

if __name__ == "__main__":  
    seed_database()




