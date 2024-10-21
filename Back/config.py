import os

# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

# Enable debug mode.
DEBUG = True

# Secret key for session management. You can generate random strings here:
SECRET_KEY = 'my precious'

# Connect to the database
# SQLALCHEMY_DATABASE_URI = 'mysql://uabdvbczs1bdk04k:ic2Ayzu8F73WtFHG3yfJ@bsever5pk9wyvubyeu2h-mysql.services.clever-cloud.com:3306/bsever5pk9wyvubyeu2h'
SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://uabdvbczs1bdk04k:ic2Ayzu8F73WtFHG3yfJ@bsever5pk9wyvubyeu2h-mysql.services.clever-cloud.com:3306/bsever5pk9wyvubyeu2h'
SQLALCHEMY_TRACK_MODIFICATIONS = False