import mysql.connector as connector
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod
from sys import platform


class Mapper (AbstractContextManager, ABC):
    """Abstrakte Basisklasse aller Mapper-Klassen"""

    def __init__(self):

        # zu Testzwecken auf der lokalen Installation
        if platform == 'darwin':
            # Mac
            USER = 'root'
            PASSWD = 'password'
            HOST = 'localhost'
            DB = 'teachingbee'
        elif platform == 'win32' or platform == "linux":
            # Windows
            USER = 'root'
            PASSWD = 'Passwort'
            HOST = '127.0.0.1'
            DB = 'teachingbee'

        self._cnx = connector.connect(user=USER, password=PASSWD,
                              host=HOST,
                              database=DB)


    def __exit__(self, exc_type, exc_val, exc_tb):
        """Was soll geschehen, wenn wir (evtl. vorübergehend) aufhören, mit dem Mapper zu arbeiten?"""
        self._cnx.close()

    @abstractmethod
    def find_all(self):
        """Lies alle Tupel aus und gib sie als Objekte zurück."""
        pass

    @abstractmethod
    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

    @abstractmethod
    def insert(self, object):
        """Füge das folgende Objekt als Datensatz in die DB ein."""
        pass

    @abstractmethod
    def update(self, object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    @abstractmethod
    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass