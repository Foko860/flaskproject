import routes
from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, mysql
import mysql.connector

# Création du blueprint pour les routes d'authentification
auth = Blueprint('auth', __name__)

# Création du blueprint
routes = Blueprint('routes', __name__)
# Route pour l'inscription
@auth.route("/inscription", methods=["GET", "POST"])
def inscription():
    if request.method == "POST":
        nom = request.form["nomComplet"]
        mail = request.form["email"]
        role = request.form["role"]
        password = request.form["password"]

        # Vérifier si l'utilisateur existe déjà
        user, _ = User.get_user_by_email(mail)
        if user:
            flash("Cet email est déjà utilisé.", "danger")
            return redirect(url_for("auth.inscription"))

        # Hasher le mot de passe avant de l'enregistrer
        hashed_password = generate_password_hash(password)
        User.create_user(nom, mail, hashed_password, role)

        flash("Compte créé avec succès !", "success")
        return redirect(url_for("auth.login"))

    return render_template("auth/page_d_inscription.html")


# ✅ Route pour la connexion (version AJAX + fallback formulaire HTML)
@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        try:
            # On vérifie si c'est du JSON (cas du JavaScript fetch)
            if request.is_json:
                data = request.get_json()
                email = data.get("mail")
                password = data.get("password")

                user, hashed_password = User.get_user_by_email(email)
                if user and check_password_hash(hashed_password, password):
                    login_user(user)
                    return jsonify({"success": True, "message": "Connexion réussie"})

                return jsonify({"success": False, "message": "Email ou mot de passe incorrect."}), 401
            else:
                # Fallback pour les soumissions via formulaire HTML
                email = request.form["mail"]
                password = request.form["password"]

                user, hashed_password = User.get_user_by_email(email)
                if user and check_password_hash(hashed_password, password):
                    login_user(user)
                    flash("Connexion réussie !", "success")
                    return redirect(url_for("dashboard"))

                flash("Email ou mot de passe incorrect.", "danger")
                return redirect(url_for("auth.login"))

        except Exception as e:
            print("Erreur login:", e)
            return jsonify({"success": False, "message": "Erreur serveur"}), 500

    return render_template("auth/connexion.html")


@routes.route('/get_measures')
def get_measures():
        try:
            cur = mysql.connection.cursor()
            cur.execute("""
                SELECT temperature, humidite, luminosite, taux_de_co2, niveau_deau 
                FROM mesure 
                ORDER BY idmesure DESC LIMIT 1
            """)
            data = cur.fetchone()
            cur.close()

            if data:
                return jsonify({
                    "temperature": data[0],
                    "humidite": data[1],
                    "luminosite": data[2],
                    "taux_de_co2": data[3],
                    "niveau_deau": data[4]
                })
            else:
                return jsonify({"error": "Aucune donnée trouvée"}), 404

        except Exception as e:
            return jsonify({"error": str(e)}), 500


@routes.route("/")
def home():
    return render_template("acceuil.html")

# Route protégée (tableau de bord)
@auth.route("/dashboard")
@login_required
def dashboard():
    return render_template("panneau_de_configuration.html")

# Route pour la déconnexion
@auth.route("/logout")
@login_required
def logout():
    logout_user()
    flash("Déconnexion réussie.", "info")
    return redirect(url_for("auth.login"))
