// Fonction pour basculer entre les langues (français ↔ anglais)
function toggleLanguage() {
    let currentLang = document.documentElement.lang;

    if (currentLang === "fr") {
        // Passage au mode anglais
        document.documentElement.lang = "en";

        document.getElementById("dashboard-text").innerText = "Dashboard";
        document.getElementById("list-text-1").innerText = "Dashboard";
        document.getElementById("list-text-2").innerText = "Data History";
        document.getElementById("list-text-3").innerText = "Sensor History";
        document.getElementById("logout-button").innerText = "Log out";
        document.getElementById("ferm-text").innerText = "Greenhouse Name";
        document.getElementById("humidity-text").innerText = "Humidity";
        document.getElementById("light-text").innerText = "Luminosity";
        document.getElementById("light-intensity-text").innerText = "Light Intensity";
        document.getElementById("temperature-text").innerText = "Temperature";
        document.getElementById("water-text").innerText = "Water Tank";
        document.getElementById("full").innerText = "full";
        document.getElementById("empty").innerText = "empty";
        document.getElementById("waterlevel").innerText = "water Level";
        document.getElementById("CO2-text").innerText = "CO2 Level";
        document.getElementById("export-button").innerText = "Export Data";
    } else {
        // Retour au français
        document.documentElement.lang = "fr";

        document.getElementById("dashboard-text").innerText = "Tableau de bord";
        document.getElementById("list-text-1").innerText = "Tableau de bord";
        document.getElementById("list-text-2").innerText = "Historiques D";
        document.getElementById("list-text-3").innerText = "Historique C.";
        document.getElementById("logout-button").innerText = "Se déconnecter";
        document.getElementById("ferm-text").innerText = "Nom de serre";
        document.getElementById("humidity-text").innerText = "Humidité";
        document.getElementById("light-text").innerText = "Luminosité";
        document.getElementById("light-intensity-text").innerText = "Intensité lumineuse";
        document.getElementById("temperature-text").innerText = "Température";
        document.getElementById("water-text").innerText = "Réservoir d'eau";
        document.getElementById("full").innerText = "plein";
        document.getElementById("empty").innerText = "vide";
        document.getElementById("waterlevel").innerText = "Niveau d'eau";
        document.getElementById("CO2-text").innerText = "Taux de CO2";
        document.getElementById("export-button").innerText = "Exporter données";
    }
}

let lastData = null;

// Fonction pour récupérer les données depuis l'API Flask
async function fetchAllMeasures() {
    try {
        const response = await fetch("http://127.0.0.1:5000/get_measures");
        const data = await response.json();

        if (data.error) {
            console.error("Erreur côté API:", data.error);
            return null;
        }

        lastData = data;
        return lastData;

    } catch (error) {
        console.error("Erreur lors de la récupération des mesures:", error);
        return null;
    }
}

// Fonction pour mettre à jour les éléments du tableau de bord
async function updateDashboard() {
    const data = await fetchAllMeasures();
    if (!data) return;

    // Température
    const temperature = data.temperature;
    const seuil = 30;
    const thermometerFill = document.getElementById("thermometerFill");
    thermometerFill.style.height = `${temperature}%`;  // Remplissage selon le % de température
    thermometerFill.style.backgroundColor =
        temperature >= seuil ? "red" :              // Rouge si ≥ 30°C
        temperature >= seuil - 5 ? "orange" :       // Orange si entre 25 et 29°C
        "green";                                    // Vert sinon
    document.getElementById("temperatureValue").innerText = `${temperature}°C`;

    // Humidité
    const humidity = data.humidite;
    humidityChart.data.datasets[0].data = [humidity, 100 - humidity];
    humidityChart.update();
    document.getElementById("humidityValue").innerText = `${humidity}%`;

    // Luminosité
    const lux = data.luminosite;
    const brightness = Math.min(lux / 1000, 1);  // Normalisation entre 0 et 1
    document.querySelector(".light").style.background = `rgba(255, 255, 0, ${brightness})`;
    document.getElementById("luxValue").innerText = `${lux} LUX`;

    // CO2
    const co2Level = data.taux_de_co2;
    const angle = (co2Level / 100) * 180 - 90;  // Conversion en angle pour l'aiguille
    document.getElementById("needle").style.transform = `translateX(-50%) rotate(${angle}deg)`;
    document.getElementById("co2Level").innerText = `${co2Level}%`;

    // Niveau d'eau
    const waterLevel = data.niveau_deau;
    document.getElementById("waterFill").style.height = `${waterLevel}%`;
    document.getElementById("waterLevelText").innerText = `${waterLevel}%`;
}

// Initialisation du graphique circulaire pour l'humidité
const ctx = document.getElementById("humidityChart").getContext("2d");
const humidityChart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Humidité", "Reste"],
        datasets: [{
            data: [0, 100],  // Valeur initiale : 0% humidité, 100% reste
            backgroundColor: ["#25523B", "#ecf0f1"]  // Vert + gris clair
        }]
    },
    options: {
        cutout: "60%",  // Cercle creux
        plugins: {
            legend: { display: false },  // Pas de légende
            tooltip: { enabled: false }  // Pas de tooltip
        }
    }
});

// Lancement de la mise à jour automatique au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
    updateDashboard();                      // Mise à jour initiale
    setInterval(updateDashboard, 9000);     // Puis toutes les 5 secondes
});
