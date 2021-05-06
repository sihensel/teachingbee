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
  stamp timestamp NOT NULL,
  course varchar(255) NOT NULL,
  studytype varchar(255) NOT NULL,
  extroverted int NOT NULL,         -- value between 1 and 5
  frequency int NOT NULL,           -- value between 1 and 5
  online int NOT NULL,              -- online is either 1 or 0 (0 = offline)
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS R_interests_profile;
CREATE TABLE R_interests_profile (
  id int AUTO_INCREMENT,
  profileID int NOT NULL,
  interestID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES Profile(id),
  FOREIGN KEY (interestID) REFERENCES Interests(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Person;
CREATE TABLE Person (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fname varchar(100) NOT NULL,    -- fname = first name
  lname varchar(100) NOT NULL,    -- lname = last name
  birthdate date NOT NULL,
  semester int NOT NULL,
  gender varchar(100) NOT NULL,
  profileID int,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES Profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Studygroup;
CREATE TABLE Studygroup (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  gname varchar(255),         -- gname = group name
  admin int NOT NULL,          -- head = group admin
  profileID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (admin) REFERENCES Person(id)
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

DROP TABLE IF EXISTS Chat;
CREATE TABLE Chat (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  groupID int,
  -- personID ???
  PRIMARY KEY (id),
  FOREIGN KEY (groupID) REFERENCES Studygroup(id)
  -- FK for person ???
  -- how to differentiate between group and person?
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Message;
CREATE TABLE Message (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  content varchar(255),
  sender int NOT NULL,
  chatID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES Person(id),
  FOREIGN KEY (chatID) REFERENCES Chat(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS R_person_chat;
CREATE TABLE R_person_chat (
  id int NOT NULL AUTO_INCREMENT,
  personID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (personID) REFERENCES Person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS Request;
CREATE TABLE Request (
  id int NOT NULL,
  stamp timestamp NOT NULL,
  sender int NOT NULL,
  recipient int NOT NULL,
  is_resolved int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES Person(id),
  FOREIGN KEY (recipient) REFERENCES Person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- insert values into tables
INSERT INTO Interests (iname) VALUES ('Sport');
INSERT INTO Interests (iname) VALUES ('Mathe');
INSERT INTO Interests (iname) VALUES ('Programmieren');

INSERT INTO Profile (stamp, course, studytype, extroverted, frequency, online) VALUES ('2000-01-01 10:00:00', 'WI', 'audiovisuell', 3, 3, 1);

INSERT INTO R_interests_profile (profileID, interestID) VALUES (1, 1);
INSERT INTO R_interests_profile (profileID, interestID) VALUES (1, 2);

INSERT INTO Person (stamp, fname, lname, birthdate, semester, gender, profileID) VALUES ('2000-01-01 10:00:00', 'Paula', 'Pudding', '2000-01-01', 3, 'female', 1);