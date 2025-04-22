document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inscriptionForm");
    const errorContainer = document.getElementById("errorContainer"); // Ajout d'un conteneur pour afficher les erreurs

    form.addEventListener("submit", function (event) {
        // Récupération des valeurs des champs
        const nomComplet = document.getElementById("nomComplet").value.trim();
        const email = document.getElementById("email").value.trim();
        const role = document.getElementById("role").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        let isValid = true;
        let errorMessage = "";

        // Vérification que tous les champs sont remplis
        if (!nomComplet || !email || !role || !password || !confirmPassword) {
            errorMessage += "❌ Tous les champs doivent être remplis.<br>";
            isValid = false;
        }

        // Vérification de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage += "❌ L'adresse email est invalide.<br>";
            isValid = false;
        }

        // Vérification du rôle (si seulement "Admin" ou "Utilisateur" sont valides)
        const rolesValides = ["Admin", "Utilisateur"];
        if (!rolesValides.includes(role)) {
            errorMessage += "❌ Le rôle doit être 'Admin' ou 'Utilisateur'.<br>";
            isValid = false;
        }

        // Vérification de la longueur du mot de passe
        if (password.length < 6) {
            errorMessage += "❌ Le mot de passe doit contenir au moins 6 caractères.<br>";
            isValid = false;
        }

        // Vérification de la correspondance des mots de passe
        if (password !== confirmPassword) {
            errorMessage += "❌ Les mots de passe ne correspondent pas.<br>";
            isValid = false;
        }

        if (!isValid) {
            errorContainer.innerHTML = errorMessage; // Afficher les erreurs dans une div
            event.preventDefault(); // Bloquer l'envoi du formulaire
        }
    });
});
