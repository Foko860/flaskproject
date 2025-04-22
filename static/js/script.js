function fetchData() {
  fetch("http://127.0.0.1:5000/get_measures")
    .then(response => response.json())
    .then(data => {
      if (data) {
        // Mise à jour des valeurs réelles
          console.log(data[0]);
          document.getElementById('temperature').textContent = ` ${data[0]} °C`;
          document.getElementById('humidite').textContent = `${data[1]} %`;
          document.getElementById('taux_de_co2').textContent = `${data[2]} ppm`;
          document.getElementById('luminosite').textContent = `${data[3]} lux`;
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}

// Actualisation toutes les secondes
setInterval(fetchData, 1000);
fetchData();

document.addEventListener("DOMContentLoaded", function () {
  const langSelector = document.getElementById("languageSelector");

  // Charger la langue depuis le stockage local si elle existe
  let currentLang = localStorage.getItem("selectedLang") || "fr";

  function loadLanguage(lang) {
    fetch("/static/js/lang.json")
      .then(response => response.json())
      .then(data => {
        // Mise à jour des LABELS uniquement
        document.getElementById("title").textContent = data[lang].title;
        document.getElementById("label-temperature").textContent = data[lang].temperature + " :";
        document.getElementById("label-humidity").textContent = data[lang].humidity + " :";
        document.getElementById("label-co2").textContent = data[lang].co2 + " :";
        document.getElementById("label-luminosity").textContent = data[lang].luminosity + " :";
        document.getElementById("actuators-link").textContent = data[lang].actuators;
        document.getElementById("footer-text").textContent = data[lang].footer;
      })
      .catch(error => {
        console.error("Erreur de chargement du fichier de langue :", error);
      });
  }

  // Appliquer la langue actuelle
  langSelector.value = currentLang;
  loadLanguage(currentLang);

  // Changer la langue lorsqu'on sélectionne une autre option
  langSelector.addEventListener("change", function () {
    currentLang = this.value;
    localStorage.setItem("selectedLang", currentLang);
    loadLanguage(currentLang);
  });
});
