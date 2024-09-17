from flask import Blueprint, request, jsonify
from models import db, Coffre

# Define a blueprint for user CRUD operations
coffre_crud = Blueprint('coffre_crud', __name__)


# Create a new user
@coffre_crud.route('/coffres', methods=['POST'])
def create_coffre():
    data = request.json
    rarete = data.get('rarete')
    image = data.get('image')
    proprietaire = data.get('proprietaire')
    visibilite = data.get('visibilite')
    liaison_indice = data.get('liaison_indice')

    # Create the new user
    new_coffre = Coffre(rarete=rarete, image=image, proprietaire=proprietaire, visibilite=visibilite, liaison_indice=liaison_indice)

    db.session.add(new_coffre)
    db.session.commit()

    return jsonify({"message": "Coffre created successfully", "Coffre ": new_coffre.rarete}), 201


# Get all users
@coffre_crud.route('/coffres', methods=['GET'])
def get_indices():
    coffres = Coffre.query.all()
    return jsonify(
        [{"id": coffre.id,"Rarete": coffre.rarete,"image": coffre.image, "Proprietaire": coffre.proprietaire, "Visibilité": coffre.visibilite, "liaison indice": coffre.liaison_indice}
         for coffre in coffres]
    ), 200


# Get a user by ID
@coffre_crud.route('/coffres/<int:coffre_id>', methods=['GET'])
def get_coffre(coffre_id):
    coffre = Coffre.query.get_or_404(coffre_id)
    return jsonify({"id": coffre.id,"Rarete": coffre.rarete,"image": coffre.image, "Proprietaire": coffre.proprietaire, "Visibilité": coffre.visibilite, "liaison indice": coffre.liaison_indice}), 200


# Update a user by ID
@coffre_crud.route('/coffres/<int:coffre_id>', methods=['PUT'])
def update_coffre(coffre_id):
    coffre = Coffre.query.get_or_404(coffre_id)
    data = request.json

    coffre.rarete = data.get('rarete', coffre.rarete)
    coffre.image = data.get('image', coffre.image)
    coffre.proprietaire = data.get('proprietaire', coffre.proprietaire)
    coffre.visibilite = data.get('visibilite', coffre.visibilite)
    coffre.liaison_indice = data.get('liaison_indice', coffre.liaison_indice)

    db.session.commit()

    return jsonify({"message": "Coffre updated successfully", "Coffre": coffre.liaison_indice}), 200


# Delete a user by ID
@coffre_crud.route('/coffres/<int:coffre_id>', methods=['DELETE'])
def delete_coffre(coffre_id):
    coffre = Coffre.query.get_or_404(coffre_id)
    db.session.delete(coffre)
    db.session.commit()

    return jsonify({"message": "Coffre   deleted successfully"}), 200
