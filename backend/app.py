from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity, get_jwt
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from models import db

app = Flask(__name__)

db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)


#authentication

# Register
@app.route("/register", methods=["POST"])
def register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_admin = request.json.get("is_admin", False)

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(email=email, password=hashed_password, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Login
@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        user.set_refresh_token(refresh_token)
        db.session.commit()
        return jsonify(
            access_token=access_token, 
            refresh_token=refresh_token, 
            is_admin=user.is_admin
        ), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401

# Refresh 
@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user.check_refresh_token(get_jwt()['jti']):
        return jsonify({"msg": "Invalid refresh token"}), 401
    
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify(access_token=new_access_token), 200

# Fetch current user 
@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user:
        return jsonify({
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email,
            "is_admin": current_user.is_admin
        }), 200
    else:
        return jsonify({"Error": "User not found"}), 404


# Logout 
@app.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"message": "Successfully logged out"}), 200

BLACKLIST = set()

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token["jti"] in BLACKLIST

if __name__ == "__main__":

    # tables
    with app.app_context():
        db.create_all()
    
    
    app.run(debug=True)
