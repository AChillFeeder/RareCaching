#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from flask import Flask, request, redirect, flash, url_for, session
from functools import wraps
from models import db
from routes.user_crud import  user_crud

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
app.config.from_pyfile('config.py')
db.init_app(app)

with app.app_context():
    db.create_all()


# Register the blueprint for user CRUD operations
app.register_blueprint(user_crud)


# Automatically tear down SQLAlchemy. | Bonne pratique
# @app.teardown_request
# def shutdown_session(exception=None):
#     db_session.remove()


# Login required decorator.

## variable session peut-être un problème
def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap

#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#


@app.route('/')
def home():
    return "home"

@app.route('/login')
def login():
    return "login"

@app.route('/register')
def register():
    return "register"

@app.route('/forgot')
def forgot():
    return "forgot"

# Error handlers.

@app.errorhandler(500)
def internal_error(error):
    # db_session.rollback()
    return "errors/500", 500


@app.errorhandler(404)
def not_found_error(error):
    return 'errors/404', 404


#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    app.run()

# Or specify port manually:
'''
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
'''