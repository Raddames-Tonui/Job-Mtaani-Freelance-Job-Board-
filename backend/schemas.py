from flask_marshmallow import Marshmallow
from models import Usermessage

# Initialize Marshmallow
ma = Marshmallow()

class UsermessageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Usermessage
        load_instance = True  # Deserialize to model instances
