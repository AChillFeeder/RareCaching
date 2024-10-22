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
            'organisateur': {
                'id': partie.organisateur.id,
                'username': partie.organisateur.username,
                'email': partie.organisateur.email
            },
            'collection': {
                'id': partie.collection.id,
                'user_id': partie.collection.user_id,
                'card_id': partie.collection.card_id
            } if partie.collection else None,
            'indice': partie.indice,
            'localisation_cache': partie.localisation_cache
        } for partie in parties])

    
    @staticmethod
    def create_partie():
        if not request.json or 'organisateur_id' not in request.json or 'localisation_cache' not in request.json:
            abort(400, description="Organisateur and localisation_cache are required fields")

        organisateur = User.query.get(request.json['organisateur_id'])
        if not organisateur:
            abort(404, description="Organisateur not found")

        collection = None
        if 'collection_id' in request.json:
            collection = Collection.query.get(request.json['collection_id'])
            if not collection:
                abort(404, description="Collection not found")

        partie = Partie(
            organisateur_id=organisateur.id,
            localisation_cache=request.json['localisation_cache'],
            collection_id=collection,
            indice=request.json.get('indice', '')
        )

        db.session.add(partie)
        db.session.commit()
        return jsonify({'id': partie.id}), 201
    
    @staticmethod
    def get_cards():
        cards = Card.query.all()
        return jsonify([{
            'id': card.id,
            'name': card.name,
            'image_name': card.image_name,
            'image_url': card.image_url,
            'rarity': card.rarity
        } for card in cards])
    
    @staticmethod
    def get_card_by_id(card_id):
        card = Card.query.get_or_404(card_id)
        return jsonify({
            'id': card.id,
            'name': card.name,
            'image_name': card.image_name,
            'image_url': card.image_url,
            'rarity': card.rarity
        })
    
    @staticmethod
    def createCard():
        if not request.json or 'name' not in request.json or 'rarity' not in request.json:
            abort(400, description="Le nom ou la rarité et manquante")

        carte = Card(
            name = request.json['name'],
            rarity = request.json['rarity'],
            image_url = f"https://raw.communitydragon.org/14.9/game/assets/characters/{request.json['name']}/skins/base/{request.json['name']}loadscreen.png",
            image_name = request.json.get('image_name')
        )

        db.session.add(carte)
        db.session.commit()
        return jsonify({'id': carte.id}), 201
    
    @staticmethod
    def get_user_collection(user_id):
        collections = Collection.query.filter_by(user_id=user_id).all()
        return jsonify([{
            'id': collection.id,
            'user_id': collection.user_id,
            'card_id': collection.card_id,
            'card_name': collection.card.name,
            'card_image_name': collection.card.image_name,
            'card_rarity': collection.card.rarity
        } for collection in collections])
    
    @staticmethod
    def transfer_collection_ownership():
        if not request.json or 'collection_id' not in request.json or 'new_owner' not in request.json:
            abort(400, description="Collection ID and new owner are required")
        collection_id = request.json['collection_id']
        new_owner = request.json['new_owner']
        collection = Collection.transfer_ownership(collection_id, new_owner)
        return jsonify({
            'id': collection.id,
            'user_id': collection.user_id,
            'card_id': collection.card_id
        }), 200

    @staticmethod
    def create_user_collection():
        if not request.json or 'user_id' not in request.json or 'card_id' not in request.json:
            abort(400, description="User ID and Card ID are required")

        user = User.query.get(request.json['user_id'])
        if not user:
            abort(404, description="User not found")

        card = Card.query.get(request.json['card_id'])
        if not card:
            abort(404, description="Card not found")

        new_collection = Collection(user_id=user.id, card_id=card.id)
        db.session.add(new_collection)
        db.session.commit()

        return jsonify({'id': new_collection.id, 'user_id': new_collection.user_id, 'card_id': new_collection.card_id}), 201


