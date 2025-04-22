// Fonction pour changer la langue entre français et anglais
function toggleLanguage() {
  let currentLang = document.documentElement.lang;

  if (currentLang === "fr") {
      // Passe en anglais
      document.documentElement.lang = "en";
      document.getElementById("welcome-text").innerText = "Welcome!";
      document.getElementById("info-text").innerText = "Enter your information";
      document.getElementById("forgot-text").innerText = "Forgot password?";
      document.getElementById("login-text").innerText = "Log in";
      document.getElementById("signup-text").innerText = "No account?";
      document.getElementById("signup-link").innerText = "Sign up";
      document.getElementById("confirmation-text").innerText = "Switch to Administrator? Click 'OK' for Admin, 'Cancel' for User.";
      document.getElementById("confirmation-button").innerText = "cancel";
  } else {
      // Revient en français
      document.documentElement.lang = "fr";
      document.getElementById("welcome-text").innerText = "Bienvenue!";
      document.getElementById("info-text").innerText = "Entrez vos informations";
      document.getElementById("forgot-text").innerText = "Mot de passe oublié?";
      document.getElementById("login-text").innerText = "Se Connecter";
      document.getElementById("signup-text").innerText = "Pas de compte?";
      document.getElementById("signup-link").innerText = "s’inscrire";
      document.getElementById("confirmation-text").innerText = "Passer en administrateur ? Cliquez sur « OK » pour Admin, sur « Annuler » pour Utilisateur.";
      document.getElementById("confirmation-button").innerText = "Annuler";
  }
}

// Affiche une confirmation pour changer de type de compte (Admin ou User)
function toggleAccount() {
  const userType = confirm("Switch to Administrator? Click 'OK' for Admin, 'Cancel' for User.");
  if (userType) {
      alert("Switched to Administrator Mode!");
  } else {
      alert("Switched to User Mode!");
  }
}

// Fonction de validation du formulaire de connexion
async function validateLogin(event) {
    event.preventDefault(); // Empêche la soumission normale du formulaire

    const mail = document.getElementById("mail").value.trim();
    const password = document.getElementById("password").value.trim();

    // Vérifie que les champs ne sont pas vides
    if (!mail || !password) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    try {
        // Envoie une requête POST à /login avec mail et mot de passe
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail, password })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = '/dashboard'; // On redirige
        } else {
            alert(data.message || "Échec de la connexion");
        }
    } catch (error) {
        alert("Erreur réseau");
    }
}

// Ajoute l'écouteur d'événement de soumission du formulaire
document.querySelector("form").addEventListener("submit", validateLogin);
