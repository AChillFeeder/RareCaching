from flask import Flask
from models import db, User, Partie, Card, Collection
import cryptography

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://uabdvbczs1bdk04k:ic2Ayzu8F73WtFHG3yfJ@bsever5pk9wyvubyeu2h-mysql.services.clever-cloud.com:3306/bsever5pk9wyvubyeu2h'  # Replace with actual credentials
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the app
db.init_app(app)

with open('list_of_champions.txt', 'r') as file:
    list_of_champions = file.read().split('\n\n')
    print(len(list_of_champions))
    list_of_champions = [champion.capitalize().strip() for champion in list_of_champions]

    print(list_of_champions)
    for champion in list_of_champions:
        carte = Card(
            name = champion,
            rarity = "commune",
            image_url = f"https://raw.communitydragon.org/14.9/game/assets/characters/{champion.lower()}/skins/base/{champion.lower()}loadscreen.png",
            image_name = champion
        )

        with app.app_context():
            db.session.add(carte)
            db.session.commit()

# Create the tables in the correct order within an app context
if __name__ == '__main__':
    with app.app_context():
        try:
            # db.create_all()
            print("Tables created successfully!")
        except Exception as e:
            print("An error occurred while creating the tables:", e)
