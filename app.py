from flask import Flask
from flask_mysqldb import MySQL
from flask_login import LoginManager
from config import Config
from models import mysql, User
from routes import auth  # Import du blueprint
from routes import routes

app = Flask(__name__)
app.register_blueprint(auth)
app.register_blueprint(routes)
app.config.from_object(Config)

# Initialiser MySQL
mysql.init_app(app)

#  Clé secrète obligatoire pour les sessions (et Flask-Login)
app.secret_key = Config.SECRET_KEY

# Initialiser Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

#  Vue à afficher si l'utilisateur n'est pas connecté
login_manager.login_view = "auth.login"

# 🔁 Charger un utilisateur depuis son ID (session)
@login_manager.user_loader
def load_user(userid):
    cur = mysql.connection.cursor()
    cur.execute("SELECT userid, nom, mail, role FROM utilisateur WHERE userid = %s", (userid,))
    user = cur.fetchone()
    cur.close()
    if user:
        return User(userid=user[0], nom=user[1], mail=user[2], role=user[3])
    return None




if __name__ == "__main__":
    app.run(debug=True)

