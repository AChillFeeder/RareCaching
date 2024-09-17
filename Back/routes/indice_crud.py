from flask import Blueprint, request, jsonify
from models import db, Indice

# Define a blueprint for user CRUD operations
indice_crud = Blueprint('indice_crud', __name__)


# Create a new user
@indice_crud.route('/indices', methods=['POST'])
def create_indice():
    data = request.json
    liaison = data.get('liaison')
    text = data.get('text')

    # Create the new user
    new_indice = Indice(liaison=liaison, text=text,)

    db.session.add(new_indice)
    db.session.commit()

    return jsonify({"message": "indice created successfully", "indice ": new_indice.liaison}), 201


# Get all users
@indice_crud.route('/indices', methods=['GET'])
def get_indices():
    indices = Indice.query.all()
    return jsonify(
        [{"id": indice.id, "liaison": indice.liaison, "text": indice.text}
         for indice in indices]
    ), 200


# Get a user by ID
@indice_crud.route('/indices/<int:indice_id>', methods=['GET'])
def get_indice(indice_id):
    indice = Indice.query.get_or_404(indice_id)
    return jsonify({"id": indice.id, "liaison": indice.liaison, "text": indice.text}), 200


# Update a user by ID
@indice_crud.route('/indices/<int:indice_id>', methods=['PUT'])
def update_indice(indice_id):
    indice = Indice.query.get_or_404(indice_id)
    data = request.json

    indice.username = data.get('liaison', indice.liaison)
    indice.email = data.get('text', indice.text)

    db.session.commit()

    return jsonify({"message": "Indice updated successfully", "Indice": indice.liaison}), 200


# Delete a user by ID
@indice_crud.route('/indices/<int:indice_id>', methods=['DELETE'])
def delete_indice(indice_id):
    indice = Indice.query.get_or_404(indice_id)
    db.session.delete(indice)
    db.session.commit()

    return jsonify({"message": "Indice deleted successfully"}), 200
