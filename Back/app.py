#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask
from flask_cors import CORS
# from flask import Flask, request, redirect, flash, url_for, session, jsonify, abort
# from flask_login import login_user, logout_user
# from functools import wraps
from models import db
from models import *
# import bcrypt
# from routes.user_crud import  user_crud
# from routes.indice_crud import  indice_crud
# from routes.coffre_crud import  coffre_crud
# from routes.partie_crud import  partie_crud

from apiImplementation import ApiImplementation

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)



# Automatically tear down SQLAlchemy. | Bonne pratique
# @app.teardown_request
# def shutdown_session(exception=None):
#     db_session.remove()


# User Endpoints
#----------------------------------------------------------------------------#

@app.route('/users', methods=['GET'])
def get_users():
    return ApiImplementation().get_users()

@app.route('/users', methods=['POST'])
def create_user():
    return ApiImplementation().create_user()

@app.route('/login', methods=['POST'])
def login():
    return ApiImplementation().login()

@app.route('/logout', methods=['POST'])
def logout():
    return ApiImplementation().logout()

# Partie Endpoints
@app.route('/parties', methods=['GET'])
def get_parties():
    return ApiImplementation().get_parties()

@app.route('/parties', methods=['POST'])
def create_partie():
    return ApiImplementation().create_partie()

# Card Endpoints
@app.route('/cards', methods=['GET'])
def get_cards():
    return ApiImplementation().get_cards()

@app.route('/cards/<int:card_id>', methods=['GET'])
def get_card_by_id(card_id):
    return ApiImplementation().get_card_by_id(card_id)

@app.route('/cards', methods=['POST'])
def create_card():
    return ApiImplementation().createCard()

# Collection Endpoints
@app.route('/collections/user/<int:user_id>', methods=['GET'])
def get_user_cards(user_id):
    return ApiImplementation().get_user_collection(user_id)

@app.route('/collections/transfer', methods=['POST'])
def transfer_collection_ownership():
    return ApiImplementation().transfer_collection_ownership()

@app.route('/collections', methods=['POST'])
def create_user_collection():
    return ApiImplementation().create_user_collection()


#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("tables created")
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''