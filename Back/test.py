from flask import Flask, jsonify, request, abort, url_for
from flask_login import UserMixin, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
import bcrypt

# Initialize the app and database instance
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://uabdvbczs1bdk04k:ic2Ayzu8F73WtFHG3yfJ@bsever5pk9wyvubyeu2h-mysql.services.clever-cloud.com:3306/bsever5pk9wyvubyeu2h'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create SQLAlchemy instance
db = SQLAlchemy(app)
