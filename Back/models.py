from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask import abort

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    monnaie_virtuelle = db.Column(db.Integer, nullable=True) # partie market

    def __repr__(self):
        return f'<User {self.username}>'

class Partie(db.Model):
    __tablename__ = 'parties'

    id = db.Column(db.Integer, primary_key=True)
    organisateur_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # relation
    localisation_cache = db.Column(db.String(256), nullable=False)  # à séparer
    collection_id = db.Column(db.Integer, db.ForeignKey('collections.id'), nullable=True)  # mettre la carte mise en jeu par l'utilisateur
    indice = db.Column(db.String(5000), nullable=True)  # à séparer

    organisateur = db.relationship('User', backref=db.backref('organised_parties', lazy=True))
    collection = db.relationship('Collection', backref=db.backref('parties', lazy=True))

    def __repr__(self):
        return f'<Partie {self.organisateur.username}>'
    

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    image_name = db.Column(db.String(256), nullable=True)
    image_url = db.Column(db.String(256), nullable=True)
    rarity = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Card {self.name}>'

class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('collections', lazy=True))
    card = db.relationship('Card', backref=db.backref('collections', lazy=True))

    def __repr__(self):
        return f'<Collection User {self.user_id} Card {self.card_id}>'

    @staticmethod
    def transfer_ownership(collection_id, new_owner_id):
        collection = Collection.query.get(collection_id)
        if not collection:
            abort(404, description="Collection not found") # à refactor et mettre dans le controller plutôt que le modèle
        new_owner = User.query.get(new_owner_id)
        if not new_owner:
            abort(404, description="New owner not found") # à refactor et mettre dans le controller plutôt que le modèle
        collection.user_id = new_owner_id
        db.session.commit()
        return collection

