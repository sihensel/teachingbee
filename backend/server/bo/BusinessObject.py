from abc import ABC, abstractmethod


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self):
        self._id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.
        self._stamp = 0
        self._name = ''

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,value):
        """Setzen der ID."""
        self._id = value
    
    def get_stamp(self):
        """Auslesen des Timestamps."""
        return self._stamp
    
    def set_stamp(self, value):
        """Setzen des Timestamps."""
        self._stamp = value
    
    def get_name(self):
        """Auslesen des Namens."""
        return self._name
    
    def set_name(self, value):
        """Setzen des Namens."""
        self._name = value
