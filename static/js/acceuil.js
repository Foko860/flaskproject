function toggleLanguage() {
    let currentLang = document.documentElement.lang;

    if (currentLang === "fr") {
        document.documentElement.lang = "en";

        // General Title and Introduction
        document.querySelector("h1").innerText = "Smart Agriculture";
        document.querySelector("#introduction h2").innerText = "🌾 Smart Agriculture, a connected revolution";
        document.querySelector("#introduction p").innerText = 
            "Modern agriculture faces numerous challenges: climate change, resource optimization, and automation. To address these challenges, the Smart Agriculture project offers a technology solution based on IoT to monitor and automate crop management.";

        document.querySelector("#objectifs h2").innerText = "🎯 Project Objectives";
        document.querySelectorAll(".objectif-flex .texte h3")[0].innerText = "🛠️ Automate";
        document.querySelectorAll(".objectif-flex .texte p")[0].innerText = "Reduce workload with automated actions.";
        document.querySelectorAll(".objectif-flex .texte h3")[1].innerText = "📊 Optimize Resources";
        document.querySelectorAll(".objectif-flex .texte p")[1].innerText = "Smart use of water and energy.";
        document.querySelectorAll(".objectif-flex .texte h3")[2].innerText = "📡 Monitor in Real-Time";
        document.querySelectorAll(".objectif-flex .texte p")[2].innerText = "Intuitive interface for crop monitoring.";
        document.querySelectorAll(".objectif-flex .texte h3")[3].innerText = "🔒 Secure Data";
        document.querySelectorAll(".objectif-flex .texte p")[3].innerText = "Protection of information exchanges via MQTT.";

        // Sensors and System Functioning (New section)
        document.querySelector("#capteurs h2").innerText = "🌿 Sensors Used in the Project";
        document.querySelector("#capteurs p").innerText = "Click on each sensor to discover its role in the smart agriculture system:";

        // Translating the sensor roles
        let sensorRoles = document.querySelectorAll(".sensor-role");
        if (sensorRoles.length) {
            sensorRoles[0].innerText = "Soil Moisture Sensor: Measures the moisture level in the soil to optimize irrigation.";
            sensorRoles[1].innerText = "Temperature and Humidity Sensor: Monitors environmental conditions for optimal plant growth.";
            sensorRoles[2].innerText = "Light Sensor: Tracks sunlight exposure to adjust lighting accordingly.";
            sensorRoles[3].innerText = "CO2 Sensor: Measures the concentration of CO2 to regulate greenhouse conditions.";
        }

        
        // Translating the functioning description
        document.querySelector("#fonctionnement h2").innerText = "⚙ How the System Works?";
        document.querySelector("#info-capteur").innerText = "IoT Sensors: It detects a physical phenomenon and transforms it into an electrical signal that can be used by a microcontroller.";
        document.querySelector("#info-microcontroleur").innerText = "Microcontroller (ESP32): Receive data from the sensors and transfer them to the database.";
        document.querySelector("#info-base-donnees").innerText = "Database: Stores collected data for analysis and decision-making.";
        document.querySelector("#info-application-web").innerText = "Web Application: Provides a user interface to farmers to monitor and control the system at a distance.";
        document.querySelector("#info-actionneur").innerText = "Actuators (Pump, Ventilation, Lighting): Actuators automate tasks such as irrigation and ventilation based on the data received.";

        document.querySelector(".info-box p").innerText = "Click on a sensor to see details here.";
        document.querySelector("footer p").innerText = "© 2025 SmartAgro - Local Interface";
    } else {
        document.documentElement.lang = "fr";

        // General Title and Introduction (French)
        document.querySelector("h1").innerText = "Agriculture Intelligente";
        document.querySelector("#introduction h2").innerText = "🌾 L’Agriculture Intelligente, une révolution connectée";
        document.querySelector("#introduction p").innerText = 
            "L’agriculture moderne fait face à de nombreux défis : changement climatique, optimisation des ressources et automatisation. Pour répondre à ces enjeux, le projet Agriculture Intelligente propose une solution technologique basée sur l’IoT pour surveiller et automatiser la gestion des cultures.";

        document.querySelector("#objectifs h2").innerText = "🎯 Les Objectifs du Projet";
        document.querySelectorAll(".objectif-flex .texte h3")[0].innerText = "🛠️ Automatiser";
        document.querySelectorAll(".objectif-flex .texte p")[0].innerText = "Réduction de la charge de travail avec des actions automatiques.";
        document.querySelectorAll(".objectif-flex .texte h3")[1].innerText = "📊 Optimiser les ressources";
        document.querySelectorAll(".objectif-flex .texte p")[1].innerText = "Utilisation intelligente de l’eau et de l’énergie.";
        document.querySelectorAll(".objectif-flex .texte h3")[2].innerText = "📡 Surveiller en temps réel";
        document.querySelectorAll(".objectif-flex .texte p")[2].innerText = "Interface intuitive pour un suivi des cultures.";
        document.querySelectorAll(".objectif-flex .texte h3")[3].innerText = "🔒 Sécuriser les données";
        document.querySelectorAll(".objectif-flex .texte p")[3].innerText = "Protection des échanges d’informations via MQTT.";

        // Sensors and System Functioning (French)
        document.querySelector("#capteurs h2").innerText = "🌿 Les Capteurs Utilisés dans le Projet";
        document.querySelector("#capteurs p").innerText = "Clique sur chaque capteur pour découvrir son rôle dans le système d’agriculture intelligente :";

        // Translating the sensor roles (French)
        let sensorRolesFr = document.querySelectorAll(".sensor-role");
        if (sensorRolesFr.length) {
            sensorRolesFr[0].innerText = "Capteur d’humidité du sol : Mesure le taux d’humidité du sol pour optimiser l’irrigation.";
            sensorRolesFr[1].innerText = "Capteur de température et d’humidité : Surveille les conditions environnementales pour une croissance optimale des plantes.";
            sensorRolesFr[2].innerText = "Capteur de lumière : Suit l’exposition à la lumière du soleil pour ajuster l’éclairage en conséquence.";
            sensorRolesFr[3].innerText = "Capteur de CO2 : Mesure la concentration de CO2 pour réguler les conditions dans la serre.";
        }

        // Translating the functioning description (French)
        // Translating the functioning description (French)
        document.querySelector("#fonctionnement h2").innerText = "⚙ Comment Fonctionne le Système ?";
        document.querySelector("#info-capteur").innerText = "Capteurs IoT : Collectent des données en temps réel de l’environnement.";
        document.querySelector("#info-microcontroleur").innerText = "Microcontrôleur (ESP32) : Le microcontrôleur reçoit les données des capteurs et les transmet à la base de données.";
        document.querySelector("#info-base-donnees").innerText = "Base de données : La base de données stocke les informations reçues pour une analyse ultérieure.";
        document.querySelector("#info-application-web").innerText = "Application web : L'application web permet aux agriculteurs de visualiser et contrôler leur exploitation à distance.";
        document.querySelector("#info-actionneur").innerText = "Actionneurs (Pompe, Ventilation, Éclairage) : Les actionneurs automatisent des tâches comme l'irrigation et la ventilation en fonction des données reçues.";

        document.querySelector(".info-box p").innerText = "Sélectionnez un capteur pour afficher les informations.";
        document.querySelector("footer p").innerText = "© 2025 SmartAgro - Interface Locale";
    }
}



    // Fonction pour afficher les infos sur le capteur au survol
function showHoverInfo(elementId) {
    const infoBox = document.getElementById(`info-${elementId}`);
    if (infoBox) {
        infoBox.style.opacity = 1;
        infoBox.style.transform = "translateY(-10px)";
    }
}

// Fonction pour masquer les infos
function hideHoverInfo(elementId) {
    const infoBox = document.getElementById(`info-${elementId}`);
    if (infoBox) {
        infoBox.style.opacity = 0;
        infoBox.style.transform = "translateY(0)";
    }
}

// Fonction pour faire défiler vers une autre section
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}

  function showInfo(capteur) {
    const infoBox = document.getElementById('capteur-info');
    let texte = "";

    switch (capteur) {
      case 'yl69':
        texte = "🌱 Le capteur YL-69 mesure l'humidité du sol. Il permet de déclencher automatiquement la pompe si le sol est trop sec.";
        break;
      case 'dht22':
        texte = "🌡️ Le capteur DHT22 mesure la température et l’humidité de l’air. Il permet d’activer la ventilation ou l’éclairage selon les conditions.";
        break;
      case 'bh1750':
        texte = "☀️ Le capteur BH1750 mesure la luminosité. Il permet d’activer un éclairage si la lumière naturelle est insuffisante.";
        break;
      case 'sen0159':
        texte = "🏭 Le capteur SEN0159 mesure le taux de CO₂. Il déclenche la ventilation si les niveaux sont trop élevés.";
        break;
      case 'water':
        texte = "🚰 Le capteur de niveau d’eau surveille le réservoir. Il prévient en cas de faible niveau d’eau pour éviter l’arrêt d’irrigation.";
        break;
      default:
        texte = "Sélectionnez un capteur pour afficher les informations.";
    }

    infoBox.innerHTML = `<p>${texte}</p>`;
  }