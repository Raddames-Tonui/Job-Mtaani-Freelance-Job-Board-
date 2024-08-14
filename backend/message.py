from flask import Blueprint, request, jsonify
from flask_socketio import emit
from models import db, Usermessage
from schemas import UsermessageSchema

message_bp = Blueprint('message', __name__)

@message_bp.route('/messages', methods=['POST'])
def send_message():
    data = request.get_json()
    new_message = Usermessage(
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        content=data['content']
    )
    db.session.add(new_message)
    db.session.commit()

    emit('message', new_message.to_dict(), broadcast=True)
    return jsonify(new_message.to_dict()), 201

@message_bp.route('/messages/<int:user_id>', methods=['GET'])
def get_messages(user_id):
    messages = Usermessage.query.filter(
        (Usermessage.sender_id == user_id) | (Usermessage.receiver_id == user_id)
    ).all()
    message_schema = UsermessageSchema(many=True)
    return jsonify(message_schema.dump(messages))

@message_bp.after_app_request
def after_request(response):
    emit('response', {'status': 'connected'}, broadcast=True)
    return response
