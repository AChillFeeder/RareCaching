#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, redirect
from flask_cors import CORS
from models import db
from models import *
from flask_login import LoginManager, login_required, current_user

from apiImplementation import ApiImplementation

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_pyfile('config.py')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = ''
db.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    # return User.query.get(int(user_id))
    return User.query.get(user_id)


# User Endpoints
#----------------------------------------------------------------------------#

@app.route('/user', methods=['GET'])
@login_required
def get_current_user():
    return ApiImplementation().get_current_user()

@app.route('/users', methods=['GET'])
def get_users():
    return ApiImplementation().get_users()

@app.route('/users', methods=['POST'])
def create_user():
    return ApiImplementation().create_user()

@app.route('/login', methods=['POST'])
def login():
    return ApiImplementation().login()

@app.route('/logout', methods=['POST', 'GET'])
@login_required
def logout():
    return ApiImplementation().logout()

# Partie Endpoints
@app.route('/parties', methods=['GET'])
@login_required
def get_parties():
    return ApiImplementation().get_parties()

@app.route('/parties', methods=['POST'])
@login_required
def create_partie():
    return ApiImplementation().create_partie()

@app.route('/partie/<int:partie_id>', methods=['DELETE'])
@login_required
def delete_partie(partie_id):
    return ApiImplementation().delete_partie(partie_id)

# Card Endpoints
@app.route('/cards', methods=['GET'])
@login_required
def get_cards():
    if current_user.is_authenticated:
        print(f"User {current_user.id} is authenticated")
    return ApiImplementation().get_cards()

@app.route('/cards/<int:card_id>', methods=['GET'])
@login_required
def get_card_by_id(card_id):
    return ApiImplementation().get_card_by_id(card_id)

@app.route('/cards', methods=['POST'])
@login_required
def create_card():
    return ApiImplementation().createCard()

# Collection Endpoints
@app.route('/collections/user/<int:user_id>', methods=['GET'])
@login_required
def get_user_cards(user_id):
    return ApiImplementation().get_user_collection(user_id)

@app.route('/collections/transfer', methods=['POST'])
@login_required
def transfer_collection_ownership():
    return ApiImplementation().transfer_collection_ownership()

@app.route('/collections', methods=['POST'])
@login_required
def create_user_collection():
    return ApiImplementation().create_user_collection()

@app.route('/parties/<int:partie_id>', methods=['GET'])
@login_required
def get_parties_by_id(partie_id):
    return ApiImplementation().get_partie_by_id(partie_id)

@app.route('/users/<int:user_id>/card_count', methods=['GET'])
@login_required
def get_user_card_count(user_id):
    return ApiImplementation().get_user_card_count(user_id)

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