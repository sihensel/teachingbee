import mysql.connector as connector
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod
import os

class Mapper (AbstractContextManager, ABC):
    """Abstrakte Basisklasse aller Mapper-Klassen"""

    def __init__(self):
        self._cnx = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):
            ''' Wenn die App in der Cloud läuft '''
            self._cnx = connector.connect(user='root', password='password',
                                          unix_socket='/cloudsql/teachingbee-179c2:europe-west3:teachingbee',
                                          database='teachingbee')
        else:
            ''' Wenn die App lokal ausgeführt wird '''
            self._cnx = connector.connect(user='root', password='password',
                                  host='localhost',
                                  database='teachingbee')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        ''' den Mapper stoppen '''
        self._cnx.close()

    @abstractmethod
    def find_all(self):
        ''' Alle Objekte aus einer Tabelle auslesen '''
        pass

    @abstractmethod
    def find_by_key(self, key):
        ''' Eintrag aus der DB nach Primärschlüssel auslesen '''
        pass

    @abstractmethod
    def insert(self, object):
        ''' Eintrag in die DB einfügen '''
        pass

    @abstractmethod
    def update(self, object):
        ''' Eintag in der DB ändern '''
        pass

    @abstractmethod
    def delete(self, object):
        ''' Eintrag aus der DB löschen '''
        pass