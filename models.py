# Importation des modules nécessaires
from flask_mysqldb import MySQL        # Permet d'utiliser MySQL avec Flask
from flask_login import UserMixin      # Fournit les méthodes de base pour gérer les utilisateurs connectés

# Initialisation de l'objet MySQL (à configurer dans app.py avec les infos de connexion)
mysql = MySQL()

# Classe représentant un utilisateur pour Flask-Login
class User(UserMixin):
    # Constructeur de l'utilisateur
    def __init__(self, userid, nom, mail, role):
        self.userid = userid      # Identifiant unique de l'utilisateur
        self.nom = nom            # Nom de l'utilisateur
        self.email = mail         # Adresse mail de l'utilisateur
        self.role = role          # Rôle (ex : "admin", "user")

    # Méthode statique pour récupérer un utilisateur en fonction de son email
    @staticmethod
    def get_user_by_email(email):
        cur = mysql.connection.cursor()  # Création d'un curseur pour exécuter la requête
        cur.execute(
            "SELECT userid, nom, mail, role, mot_de_passe FROM utilisateur WHERE mail = %s",
            (email,)
        )
        user = cur.fetchone()      # Récupère une ligne correspondant à l'email
        cur.close()                # Ferme le curseur

        # Si l'utilisateur existe, retourne une instance User + son mot de passe (séparé pour vérification)
        if user:
            return User(userid=user[0], nom=user[1], mail=user[2], role=user[3]), user[4]
            # user[4] = mot de passe haché (à comparer avec celui saisi)
        return None, None          # Si aucun utilisateur n'est trouvé

    # Méthode statique pour créer un nouvel utilisateur dans la base
    @staticmethod
    def create_user(nom, mail, password, role):
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO utilisateur (nom, mail, mot_de_passe, role) VALUES (%s, %s, %s, %s)",
            (nom, mail, password, role)
        )
        mysql.connection.commit()  # Applique les changements dans la base de données
        cur.close()                # Ferme le curseur

    # Méthode utilisée par Flask-Login pour identifier l'utilisateur connecté
    def get_id(self):
        return str(self.userid)    # Retourne l'ID de l'utilisateur sous forme de chaîne (obligatoire pour Flask-Login)
