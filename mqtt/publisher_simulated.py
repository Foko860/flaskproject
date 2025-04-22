import paho.mqtt.client as mqtt
import random
import time
import json

# Paramètres MQTT
BROKER = "localhost"
PORT = 1883
TOPIC = "capteurs/data"
username = "admin"
password = "admin123"

# Génère les données de capteurs simulées
def generate_sensor_data():
    temperature = round(random.uniform(18.0, 30.0), 2)
    humidite = round(random.uniform(40.0, 80.0), 2)
    luminosite = random.randint(0, 1023)
    taux_de_co2 = round(random.uniform(10.0, 20.0), 2)
    niveau_deau = round(random.uniform(20.0, 100.0), 2)

    return {
        "temperature": temperature,
        "humidite": humidite,
        "luminosite": luminosite,
        "taux_de_co2": taux_de_co2,
        "niveau_deau": niveau_deau
    }

# Publication des données toutes les 10s
def publish_sensor_data(client):
    while True:
        data = generate_sensor_data()
        payload = json.dumps(data)
        client.publish(TOPIC, payload)
        print(f"Publié: {payload}")
        time.sleep(10)

# Connexion au broker MQTT
client = mqtt.Client()
client.username_pw_set(username, password)
client.connect(BROKER, PORT, 60)

publish_sensor_data(client)
