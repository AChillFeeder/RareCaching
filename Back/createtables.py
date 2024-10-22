from flask import Flask
from models import db, User, Partie, Card, Collection
import cryptography

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://uabdvbczs1bdk04k:ic2Ayzu8F73WtFHG3yfJ@bsever5pk9wyvubyeu2h-mysql.services.clever-cloud.com:3306/bsever5pk9wyvubyeu2h'  # Replace with actual credentials
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the app
db.init_app(app)

# Create the tables in the correct order within an app context
if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
            print("Tables created successfully!")
        except Exception as e:
            print("An error occurred while creating the tables:", e)
