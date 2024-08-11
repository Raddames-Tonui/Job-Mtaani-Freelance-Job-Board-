# socketio.py

from flask import Flask, render
from flask_socketio import SocketIO, emit
from app import app 
from models import db, Usermessage 



