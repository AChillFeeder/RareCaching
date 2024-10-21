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

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
app.config.from_pyfile('config.py')
db.init_app(app)

with app.app_context():
    db.create_all()


# Register the blueprint for user CRUD operations

app.register_blueprint(user_crud)
app.register_blueprint(indice_crud)
app.register_blueprint(coffre_crud)
app.register_blueprint(partie_crud)

# Automatically tear down SQLAlchemy. | Bonne pratique
# @app.teardown_request
# def shutdown_session(exception=None):
#     db_session.remove()


# Login required decorator.

## variable session peut-être un problème
def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap

#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#

# User Endpoints
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'nombre_offre': user.nombre_offre,
        'monnaie_virtuelle': user.monnaie_virtuelle
    } for user in users])

@app.route('/users', methods=['POST'])
def create_user():
    if not request.json or 'username' not in request.json:
        abort(400, description="Username is required")
    hashed_password = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
    user = User(
        username=request.json['username'],
        email=request.json.get('email'),
        password=hashed_password,
        nombre_offre=request.json.get('nombre_offre'),
        monnaie_virtuelle=request.json.get('monnaie_virtuelle')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id}), 201

@app.route('/login', methods=['POST'])
def login():
    if not request.json or 'username' not in request.json or 'password' not in request.json:
        abort(400, description="Username and password are required")
    user = User.query.filter_by(username=request.json['username']).first()
    if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user.password):
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        abort(401, description="Invalid credentials")

@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

# Partie Endpoints
@app.route('/parties', methods=['GET'])
def get_parties():
    parties = Partie.query.all()
    return jsonify([{
        'id': partie.id,
        'organisateur': partie.organisateur,
        'participants': partie.participants
    } for partie in parties])

@app.route('/parties', methods=['POST'])
def create_partie():
    if not request.json or 'organisateur' not in request.json:
        abort(400, description="Organisateur is required")
    partie = Partie(
        organisateur=request.json['organisateur'],
        participants=request.json.get('participants')
    )
    db.session.add(partie)
    db.session.commit()
    return jsonify({'id': partie.id}), 201

# Coffre Endpoints
@app.route('/coffres', methods=['GET'])
def get_coffres():
    coffres = Coffre.query.all()
    return jsonify([{
        'id': coffre.id,
        'rarete': coffre.rarete,
        'image': coffre.image,
        'proprietaire': coffre.proprietaire,
        'visibilite': coffre.visibilite,
        'liaison_indice': coffre.liaison_indice,
        'game_id': coffre.game_id
    } for coffre in coffres])

@app.route('/coffres', methods=['POST'])
def create_coffre():
    if not request.json or 'rarete' not in request.json:
        abort(400, description="Rarete is required")
    coffre = Coffre(
        rarete=request.json['rarete'],
        image=request.json['image'],
        proprietaire=request.json['proprietaire'],
        visibilite=request.json['visibilite'],
        liaison_indice=request.json['liaison_indice'],
        game_id=request.json.get('game_id')
    )
    db.session.add(coffre)
    db.session.commit()
    return jsonify({'id': coffre.id}), 201

@app.route('/coffres/game/<int:game_id>', methods=['GET'])
def get_coffres_by_game_id(game_id):
    coffres = Coffre.query.filter_by(game_id=game_id).all()
    return jsonify([{
        'id': coffre.id,
        'rarete': coffre.rarete,
        'image': coffre.image,
        'proprietaire': coffre.proprietaire,
        'visibilite': coffre.visibilite,
        'liaison_indice': coffre.liaison_indice,
        'game_id': coffre.game_id
    } for coffre in coffres])

# Indice Endpoints
@app.route('/indices', methods=['GET'])
def get_indices():
    indices = Indice.query.all()
    return jsonify([{
        'id': indice.id,
        'liaison': indice.liaison,
        'text': indice.text,
        'game_id': indice.game_id
    } for indice in indices])

@app.route('/indices', methods=['POST'])
def create_indice():
    if not request.json or 'liaison' not in request.json:
        abort(400, description="Liaison is required")
    indice = Indice(
        liaison=request.json['liaison'],
        text=request.json['text'],
        game_id=request.json.get('game_id')
    )
    db.session.add(indice)
    db.session.commit()
    return jsonify({'id': indice.id}), 201

@app.route('/indices/game/<int:game_id>', methods=['GET'])
def get_indices_by_game_id(game_id):
    indices = Indice.query.filter_by(game_id=game_id).all()
    return jsonify([{
        'id': indice.id,
        'liaison': indice.liaison,
        'text': indice.text,
        'game_id': indice.game_id
    } for indice in indices])

# Card Endpoints
@app.route('/cards', methods=['GET'])
def get_cards():
    cards = Card.query.all()
    return jsonify([{
        'id': card.id,
        'name': card.name,
        'image_name': card.image_name,
        'value': card.value,
        'rarity': card.rarity
    } for card in cards])

@app.route('/cards/<int:card_id>', methods=['GET'])
def get_card_by_id(card_id):
    card = Card.query.get_or_404(card_id)
    return jsonify({
        'id': card.id,
        'name': card.name,
        'image_name': card.image_name,
        'value': card.value,
        'rarity': card.rarity
    })

# Collection Endpoints
@app.route('/collections/user/<int:user_id>', methods=['GET'])
def get_user_cards(user_id):
    collections = Collection.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': collection.id,
        'user_id': collection.user_id,
        'card_id': collection.card_id,
        'card_name': collection.card.name,
        'card_image_name': collection.card.image_name,
        'card_value': collection.card.value,
        'card_rarity': collection.card.rarity
    } for collection in collections])

#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    db.create_all()
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''