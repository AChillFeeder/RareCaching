from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

# Initialize the database instance
db = SQLAlchemy()

# Example User model
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    nombre_offre = db.Column(db.Integer, nullable=True)
    monnaie_virtuelle = db.Column(db.String(256), nullable=True)

    def __repr__(self):
        return f'<User {self.username}>'

# Example Post model (replace with models you need)
class Partie(db.Model):
    __tablename__ = 'parties'

    id = db.Column(db.Integer, primary_key=True)
    organisateur = db.Column(db.String(256), nullable=False)
    participants = db.Column(db.String(256), nullable=False)

    #user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    #user = db.relationship('User', backref=db.backref('posts', lazy=True))

    def __repr__(self):
        return f'<Partie {self.organisateur}>'

class Coffre(db.Model):
    __tablename__  = 'coffres'

    id = db.Column(db.Integer, primary_key=True)
    rarete = db.Column(db.String(256), nullable=False)
    image = db.Column(db.String(256), nullable=False)
    proprietaire = db.Column(db.String(256), nullable=False)
    visibilite = db.Column(db.String(256), nullable=False)
    liaison_indice = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Coffre {self.rarete}>'

class Indice(db.Model):
    __tablename__ = 'indices'

    id = db.Column(db.Integer, primary_key=True)
    liaison = db.Column(db.String(256), nullable=False)
    text = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Indice {self.liaison}>'

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    image_name = db.Column(db.String(256), nullable=False)
    value = db.Column(db.Integer, nullable=False)
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
    

