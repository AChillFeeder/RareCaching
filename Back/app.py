#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, request, session, jsonify
from functools import wraps
from models import db, User
from routes.user_crud import user_crud
from routes.indice_crud import indice_crud
from routes.coffre_crud import coffre_crud
from routes.partie_crud import partie_crud
from werkzeug.security import generate_password_hash, check_password_hash

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
app.config.from_pyfile('config.py')
app.secret_key = 'your-secret-key'  # Replace with a secure, random key
db.init_app(app)

with app.app_context():
    db.create_all()

# Register blueprints
app.register_blueprint(user_crud)
app.register_blueprint(indice_crud)
app.register_blueprint(coffre_crud)
app.register_blueprint(partie_crud)

#----------------------------------------------------------------------------#
# Login Required Decorator
#----------------------------------------------------------------------------#

def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'user_id' in session:
            return test(*args, **kwargs)
        else:
            return jsonify({'message': 'Authentication required'}), 401
    return wrap

#----------------------------------------------------------------------------#
# Routes
#----------------------------------------------------------------------------#

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the home page'}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'message': 'Invalid data'}), 400

    username = data['username']
    email = data['email']
    password = data['password']

    # Check if user already exists
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'message': 'Username or email already exists'}), 409

    # Create new user
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ('username', 'password')):
        return jsonify({'message': 'Invalid data'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({'message': 'Logged in successfully'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/forgot')
def forgot():
    return jsonify({'message': 'Password reset functionality coming soon'}), 200

@app.route('/test')
@login_required
def test():
    current_user = User.query.get(session['user_id'])
    return jsonify({'message': f'Hello, {current_user.username}'}), 200

#----------------------------------------------------------------------------#
# Error Handlers
#----------------------------------------------------------------------------#

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'message': 'Internal server error'}), 500

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'message': 'Resource not found'}), 404

#----------------------------------------------------------------------------#
# Launch
#----------------------------------------------------------------------------#

if __name__ == '__main__':
    app.run()
