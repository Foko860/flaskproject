"""# __init__.py

from flask import Flask
from flask_login import LoginManager
from .config import Config
from .models import mysql

app = Flask(__name__)

# Charger la configuration
app.config.from_object(Config)

# Initialisation de la base de données MySQL
mysql.init_app(app)

# Initialisation de Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Importer les routes"""""

