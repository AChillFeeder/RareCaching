from flask import Blueprint, request, jsonify
from models import db, User

# Define a blueprint for user CRUD operations
user_crud = Blueprint('user_crud', __name__)


# Create a new user
@user_crud.route('/users', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    nombre_offre = data.get('nombre_offre')
    monnaie_virtuelle = data.get('monnaie_virtuelle')
    abc = data.get('abc')

    if not username or not email or not password:
        return jsonify({"error": "Missing data"}), 400

    # Create the new user
    new_user = User(username=username, email=email, password=password, nombre_offre=nombre_offre, monnaie_virtuelle=monnaie_virtuelle, abc=abc)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "user": new_user.username}), 201


# Get all users
@user_crud.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify(
        [{"id": user.id, "username": user.username, "email": user.email, "nombre coffre" : user.nombre_offre, "monnaie virtuelle" : user.monnaie_virtuelle}
         for user in users]
    ), 200


# Get a user by ID
@user_crud.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({"id": user.id, "username": user.username, "email": user.email}), 200


# Update a user by ID
@user_crud.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json

    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)

    db.session.commit()

    return jsonify({"message": "User updated successfully", "user": user.username}), 200


# Delete a user by ID
@user_crud.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200
