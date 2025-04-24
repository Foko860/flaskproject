from urllib.parse import urlparse
import os

url = urlparse(os.getenv("MYSQL_URL"))

class Config:
    MYSQL_HOST = url.hostname
    MYSQL_PORT = url.port or 3306
    MYSQL_USER = url.username
    MYSQL_PASSWORD = url.password
    MYSQL_DB = url.path[1:]  # enlève le / devant le nom de la DB


