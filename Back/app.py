#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, request, redirect, flash, url_for, session, jsonify, abort
from flask_login import login_user, logout_user
from functools import wraps
from models import db
from models import *
import bcrypt
from routes.user_crud import  user_crud
from routes.indice_crud import  indice_crud
from routes.coffre_crud import  coffre_crud
from routes.partie_crud import  partie_crud

from apiImplementation import ApiImplementation

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
app.config.from_pyfile('config.py')
db.init_app(app)

with app.app_context():
    db.create_all()


# à regarder ensemble!!
# Register the blueprint for user CRUD operations

# app.register_blueprint(user_crud)
# app.register_blueprint(indice_crud)
# app.register_blueprint(coffre_crud)
# app.register_blueprint(partie_crud)

# Automatically tear down SQLAlchemy. | Bonne pratique
# @app.teardown_request
# def shutdown_session(exception=None):
#     db_session.remove()

#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#

# User Endpoints
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

@app.route('/parties', methods=['GET'])
def get_parties():
    return ApiImplementation().get_parties()

@app.route('/parties', methods=['POST'])
def create_partie():
    return ApiImplementation().create_partie()

@app.route('/coffres', methods=['GET'])
def get_coffres():
    return ApiImplementation().get_coffres()

@app.route('/coffres', methods=['POST'])
def create_coffre():
    return ApiImplementation().create_coffre()

@app.route('/coffres/game/<int:game_id>', methods=['GET'])
def get_coffres_by_game_id(game_id):
    return ApiImplementation().get_coffres_by_game_id(game_id)

@app.route('/indices', methods=['GET'])
def get_indices():
    return ApiImplementation().get_indices()

@app.route('/indices', methods=['POST'])
def create_indice():
    return ApiImplementation().create_indice()

@app.route('/indices/game/<int:game_id>', methods=['GET'])
def get_indices_by_game_id(game_id):
    return ApiImplementation().get_indices_by_game_id(game_id)

# Card Endpoints
@app.route('/cards', methods=['GET'])
def get_cards():
    return ApiImplementation().get_cards()

@app.route('/cards/<int:card_id>', methods=['GET'])
def get_card_by_id(card_id):
    return ApiImplementation().get_card_by_id(card_id)

# Collection Endpoints
@app.route('/collections/user/<int:user_id>', methods=['GET'])
def get_user_cards(user_id):
    return ApiImplementation().get_user_cards(user_id)

#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''