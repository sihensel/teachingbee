-- create database
DROP DATABASE IF EXISTS teachingbee;
CREATE DATABASE teachingbee;

USE teachingbee;

-- create tables
DROP TABLE IF EXISTS Interests;
CREATE TABLE Interests (
  id int AUTO_INCREMENT,
  iname varchar(255) NOT NULL,  -- iname = interest name
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Profile;
CREATE TABLE Profile (
  id int AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  course varchar(255) NOT NULL,
  studytype varchar(255) NOT NULL,  -- auditiv, visuell, kommunikativ, motorisch
  extroverted int NOT NULL,         -- value between 1 and 3
  frequency int NOT NULL,           -- value between 1 and 3
  online varchar(100) NOT NULL,     -- offline, online, beides
  interest int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (interest) REFERENCES Interests(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Person;
CREATE TABLE Person (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fname varchar(100) NOT NULL,    -- fname = first name
  lname varchar(100) NOT NULL,    -- lname = last name
  birthdate varchar(100) NOT NULL,
  semester int NOT NULL,
  gender varchar(100) NOT NULL,
  profileID int,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES Profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Studygroup;
CREATE TABLE Studygroup (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  gname varchar(255),         -- gname = group name
  info varchar(255),
  profileID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES Profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS R_person_group;
CREATE TABLE R_person_group (
  id int NOT NULL AUTO_INCREMENT,
  groupID int NOT NULL,
  personID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (groupID) REFERENCES Studygroup(id),
  FOREIGN KEY (personID) REFERENCES Person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Message;
CREATE TABLE Message (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  content varchar(255),
  sender int NOT NULL,
  recipient int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES Person(id),
  FOREIGN KEY (recipient) REFERENCES Person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Groupmessage;
CREATE TABLE Groupmessage (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  content varchar(255),
  sender int NOT NULL,
  groupID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES Person(id),
  FOREIGN KEY (groupID) REFERENCES Studygroup(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Request;
CREATE TABLE Request (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sender int NOT NULL,
  recipient int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES Person(id),
  FOREIGN KEY (recipient) REFERENCES Person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Grouprequest;
CREATE TABLE Grouprequest (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sender int NOT NULL,
  groupID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES Person(id),
  FOREIGN KEY (groupID) REFERENCES Studygroup(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- insert values into tables
INSERT INTO Interests (iname) VALUES ('Sport');
INSERT INTO Interests (iname) VALUES ('Technologie');
INSERT INTO Interests (iname) VALUES ('Musik');
INSERT INTO Interests (iname) VALUES ('Reisen');
INSERT INTO Interests (iname) VALUES ('Gaming');

INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('WI', 'auditiv', 3, 3, 'online', 1);
INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('OM', 'kommunikativ', 2, 1, 'offline', 4);
INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('ID', 'motorisch', 2, 1, 'beides', 3);
INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('WI', 'auditiv', 1, 2, 'beides', 3);
INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('WI', 'auditiv', 1, 2, 'beides', 3);

INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('WI', 'auditiv', 1, 2, 'beides', 3);
INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('WI', 'auditiv', 2, 1, 'beides', 2);
INSERT INTO Profile (course, studytype, extroverted, frequency, online, interest) VALUES ('WI', 'auditiv', 2, 1, 'beides', 2);

INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES ('Paula', 'Pudding', '2000-01-01', 3, 'weiblich', 1);
INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES ('Paul', 'Meier', '2000-01-01', 2, 'männlich', 2);
INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES ('Petra', 'Müller', '2000-01-01', 1, 'weiblich', 3);
INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES ('Sabine', 'Kurz', '2000-01-01', 4, 'weiblich', 4);
INSERT INTO Person (fname, lname, birthdate, semester, gender, profileID) VALUES ('Hans', 'Lang', '2000-01-01', 6, 'männlich', 5);

INSERT INTO Message (content, sender, recipient) VALUES ('Hallo wie geht es dir ?', 1, 2);
INSERT INTO Message (content, sender, recipient) VALUES ('Mir geht es sehr gut und dir?', 2, 1);
INSERT INTO Message (content, sender, recipient) VALUES ('Wann treffen wir uns heute?', 1, 2);
INSERT INTO Message (content, sender, recipient) VALUES ('Mit dir treffe ich mich nicht', 2, 1);
INSERT INTO Message (content, sender, recipient) VALUES ('Machso okay, schade', 1, 2);
INSERT INTO Message (content, sender, recipient) VALUES ('Testnachricht 1-3', 1, 3);
INSERT INTO Message (content, sender, recipient) VALUES ('Testnachricht 3-1', 3, 1);

INSERT INTO Studygroup (gname, info, profileID) VALUES ('Gruppe 1', "Dies ist die erste Gruppe", 6);
INSERT INTO Studygroup (gname, info, profileID) VALUES ('Gruppe 2', "Dies ist die zweite Gruppe", 7);
INSERT INTO Studygroup (gname, info, profileID) VALUES ('Gruppe 2', "Dies ist die dritte Gruppe", 8);

INSERT INTO Groupmessage (content, sender, groupID) VALUES ('Hallo wie gehts in der Gruppe', 1, 1);
INSERT INTO Groupmessage (content, sender, groupID) VALUES ('Hallo wie gehts in der Gruppe ich bin die 3', 3, 1);
INSERT INTO Groupmessage (content, sender, groupID) VALUES ('gut ich bin 1', 1, 2);
INSERT INTO Groupmessage (content, sender, groupID) VALUES ('gut ich 3', 3, 2);
INSERT INTO Groupmessage (content, sender, groupID) VALUES ('gut und ich 4', 4, 2);

INSERT INTO R_person_group (groupID, personID) VALUES (1, 1);
INSERT INTO R_person_group (groupID, personID) VALUES (1, 2);
INSERT INTO R_person_group (groupID, personID) VALUES (1, 3);
INSERT INTO R_person_group (groupID, personID) VALUES (2, 1);
INSERT INTO R_person_group (groupID, personID) VALUES (2, 3);
INSERT INTO R_person_group (groupID, personID) VALUES (2, 4);

INSERT INTO Request (sender, recipient) VALUES (4, 1);
INSERT INTO Request (sender, recipient) VALUES (5, 1);
INSERT INTO Grouprequest (sender, groupID) VALUES (1, 3);