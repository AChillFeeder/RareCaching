from flask import Blueprint, request, jsonify
from models import db, Partie

# Define a blueprint for user CRUD operations
partie_crud = Blueprint('partie_crud', __name__)


# Create a new user
@partie_crud.route('/parties', methods=['POST'])
def create_partie():
    data = request.json
    organisateur = data.get('organisateur')
    participants = data.get('participants')

    # Create the new user
    new_partie = Partie(organisateur=organisateur, participants=participants)

    db.session.add(new_partie)
    db.session.commit()

    return jsonify({"message": "Partie created successfully", "Partie ": new_partie.organisateur}), 201


# Get all users
@partie_crud.route('/parties', methods=['GET'])
def get_parties():
    parties = Partie.query.all()
    return jsonify(
        [{"id": partie.id, "Organisateur": partie.organisateur, "Participants": partie.participants}
         for partie in parties]
    ), 200


# Get a user by ID
@partie_crud.route('/parties/<int:id>', methods=['GET'])
def get_partie(id):
    partie = Partie.query.get_or_404(id)
    return jsonify({"id": partie.id, "Organisateur": partie.organisateur, "Participants": partie.participants}), 200


# Update a user by ID
@partie_crud.route('/parties/<int:id>', methods=['PUT'])
def update_partie(id):
    partie = Partie.query.get_or_404(id)
    data = request.json

    partie.organisateur = data.get('organisateur', partie.organisateur)
    partie.participants = data.get('participants', partie.participants)

    db.session.commit()

    return jsonify({"message": "partie updated successfully", "Partie": partie}), 200


# Delete a user by ID
@partie_crud.route('/parties/<int:id>', methods=['DELETE'])
def delete_partie(id):
    ipartie = Partie.query.get_or_404(id)
    db.session.delete(ipartie)
    db.session.commit()

    return jsonify({"message": "Partie deleted successfully"}), 200
