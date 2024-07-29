from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Metadata
from sqlalchemy_serializer import SerializerMixin

metadata = Metadata(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)