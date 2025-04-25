import paho.mqtt.client as mqtt
import mysql.connector
import json

# Paramètres MQTT
BROKER = "localhost"
PORT = 1883
TOPIC = "capteurs/data"
username = "admin"
password = "admin123"

# Paramètres MySQL
DB_HOST = "shuttle.proxy.rlwy.net"
DB_USER = "root"
DB_PASSWORD = "CQOPOfXQzUgZZckivpJfjFFwPWTntIwC"
DB_NAME = "railway"

# Connexion MySQL
def connect_db():
    try:
        return mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
    except mysql.connector.Error as e:
        print("Erreur de connexion MySQL:", e)
        return None

# Callback quand un message est reçu
def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode("utf-8"))
        temperature = payload.get("temperature")
        humidite = payload.get("humidite")
        luminosite = payload.get("luminosite")
        taux_de_co2 = payload.get("taux_de_co2")
        niveau_deau = payload.get("niveau_deau")

        print(f"Temp: {temperature}°C, Humidité: {humidite}%, Luminosité: {luminosite}, CO2: {taux_de_co2}%, Eau: {niveau_deau}%")

        conn = connect_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO mesure (temperature, humidite, taux_de_co2, niveau_deau,luminosite)
                VALUES (%s, %s, %s, %s, %s)
            """, (temperature, humidite, luminosite, taux_de_co2, niveau_deau))
            conn.commit()
            cursor.close()
            conn.close()
            print("Données insérées en base.")
    except Exception as e:
        print("Erreur lors du traitement du message:", e)

# Connexion au broker MQTT
client = mqtt.Client()
client.username_pw_set(username, password)
client.on_message = on_message
client.connect(BROKER, PORT, 60)
client.subscribe(TOPIC)

print("Client MQTT connecté et en attente de messages...")
client.loop_forever()
