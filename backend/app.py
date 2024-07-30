#!/usr/bin/env python3

from flask import Flask, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt


from models import db, Administrator, Client, Freelancer


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)

# ================================ CLIENTS =================================

# Route to create a client
@app.route('/clients', methods=['POST'])
def create_client():
    data = request.get_json()
    new_client = Client(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        business_description=data.get('business_description'),
        rating=data.get('rating', 0.0)
    )
    db.session.add(new_client)
    db.session.commit()
    return jsonify(new_client.to_dict()), 201

# Route to get all clients
@app.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    return jsonify([client.to_dict() for client in clients])


# ==================================== FREELANCERS ===============================
# Create Freelancers
@app.route('/freelancers', methods=['POST'])
def create_freelancer():
    data = request.get_json()
    new_freelancer = Freelancer(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        skills=data.get('skills'),
        experience=data.get('experience'),
        rating=data.get('rating', 0.0)
    )
    db.session.add(new_freelancer)
    db.session.commit()
    return jsonify(new_freelancer.to_dict()), 201

# Route to get all freelancers
@app.route('/freelancers', methods=['GET'])
def get_freelancers():
    freelancers = Freelancer.query.all()
    return jsonify([freelancer.to_dict() for freelancer in freelancers])


# =================================== ADMINISTRATORS ===============================

# Route to create an administrator
@app.route('/administrators', methods=['POST'])
def create_administrator():
    data = request.get_json()
    new_administrator = Administrator(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        role=data['role']
    )
    db.session.add(new_administrator)
    db.session.commit()
    return jsonify(new_administrator.to_dict()), 201


# Route to get all administrators
@app.route('/administrators', methods=['GET'])
def get_administrators():
    administrators = Administrator.query.all()
    return jsonify([administrator.to_dict() for administrator in administrators])



if __name__ == "_main_":
    app.run(debug=True, port=5555)
