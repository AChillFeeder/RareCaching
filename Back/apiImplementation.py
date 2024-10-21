from models import *
from flask import jsonify, request, abort
import bcrypt
from flask_login import login_user, logout_user

class ApiImplementation:
    @staticmethod
    def get_users():
        users = User.query.all()
        return jsonify([{
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'nombre_offre': user.nombre_offre,
            'monnaie_virtuelle': user.monnaie_virtuelle
        } for user in users])
    
    @staticmethod
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
    
    @staticmethod
    def login():
        if not request.json or 'username' not in request.json or 'password' not in request.json:
            abort(400, description="Username and password are required")
        user = User.query.filter_by(username=request.json['username']).first()
        if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user.password):
            login_user(user)
            return jsonify({'message': 'Login successful'}), 200
        else:
            abort(401, description="Invalid credentials")

    @staticmethod
    def logout():
        logout_user()
        return jsonify({'message': 'Logout successful'}), 200
    
    @staticmethod
    def get_parties():
        parties = Partie.query.all()
        return jsonify([{
            'id': partie.id,
            'organisateur': partie.organisateur,
            'participants': partie.participants
        } for partie in parties])
    
    @staticmethod
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
    
    @staticmethod
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
    
    @staticmethod
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
    
    @staticmethod
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
    
    @staticmethod
    def get_indices():
        indices = Indice.query.all()
        return jsonify([{
            'id': indice.id,
            'liaison': indice.liaison,
            'text': indice.text,
            'game_id': indice.game_id
        } for indice in indices])
    
    @staticmethod
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
    
    @staticmethod
    def get_indices_by_game_id(game_id):
        indices = Indice.query.filter_by(game_id=game_id).all()
        return jsonify([{
            'id': indice.id,
            'liaison': indice.liaison,
            'text': indice.text,
            'game_id': indice.game_id
        } for indice in indices])
    
    @staticmethod
    def get_cards():
        cards = Card.query.all()
        return jsonify([{
            'id': card.id,
            'name': card.name,
            'image_name': card.image_name,
            'value': card.value,
            'rarity': card.rarity
        } for card in cards])
    
    @staticmethod
    def get_card_by_id(card_id):
        card = Card.query.get_or_404(card_id)
        return jsonify({
            'id': card.id,
            'name': card.name,
            'image_name': card.image_name,
            'value': card.value,
            'rarity': card.rarity
        })
    
    @staticmethod
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
