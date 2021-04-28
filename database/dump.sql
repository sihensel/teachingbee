-- create database
DROP DATABASE IF EXISTS teachingbee;
CREATE DATABASE teachingbee;

USE teachingbee;


-- create tables
DROP TABLE IF EXISTS interests;
CREATE TABLE interests (
  id int AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS profile;
CREATE TABLE profile (
  id int AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  course varchar(255) NOT NULL,
  studytype varchar(255) NOT NULL,
  extroverted int NOT NULL,
  frequency int NOT NULL,
  online int NOT NULL,
  /*on_off varchar(3) NOT NULL,*/
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS interests_in_profile;
CREATE TABLE interests_in_profile (
  id int AUTO_INCREMENT,
  profileID int NOT NULL,
  interestID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES profile(id),
  FOREIGN KEY (interestID) REFERENCES interests(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS person;
CREATE TABLE person (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  fname varchar(100) NOT NULL,
  lname varchar(100) NOT NULL,
  birthdate date NOT NULL,
  semester int NOT NULL,
  gender varchar(100) NOT NULL,
  profileID int,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS studygroup;
CREATE TABLE studygroup (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  gname varchar(255),
  head int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (head) REFERENCES person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS person_in_group;
CREATE TABLE person_in_group (
  id int NOT NULL AUTO_INCREMENT,
  groupID int NOT NULL,
  personID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (groupID) REFERENCES studygroup(id),
  FOREIGN KEY (personID) REFERENCES person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS chat;
CREATE TABLE chat (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  groupID int,
  -- personID ???
  PRIMARY KEY (id),
  FOREIGN KEY (groupID) REFERENCES studygroup(id)
  -- FK for person ???
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS message;
CREATE TABLE message (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  content varchar(255),
  sender int NOT NULL,
  chatID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES person(id),
  FOREIGN KEY (chatID) REFERENCES chat(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS person_in_chat;
CREATE TABLE person_in_chat (
  id int NOT NULL AUTO_INCREMENT,
  personID int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (personID) REFERENCES person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS request;
CREATE TABLE request (
  id int NOT NULL,
  stamp timestamp NOT NULL,
  sender int NOT NULL,
  recipient int NOT NULL,
  is_resolved int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender) REFERENCES person(id),
  FOREIGN KEY (recipient) REFERENCES person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- insert values into tables
INSERT INTO interests (name) VALUES ('Sport');
INSERT INTO interests (name) VALUES ('Mathe');
INSERT INTO interests (name) VALUES ('Programmieren');

INSERT INTO profile (stamp, course, studytype, extroverted, frequency, online) VALUES ('2000-01-01 10:00:00', 'WI', 'audiovisuell', 3, 3, 1);

INSERT INTO interests_in_profile (profileID, interestID) VALUES (1, 1);
INSERT INTO interests_in_profile (profileID, interestID) VALUES (1, 2);

INSERT INTO person (stamp, fname, lname, birthdate, semester, gender, profileID) VALUES ('2000-01-01 10:00:00', 'Paula', 'Pudding', '2000-01-01', 3, 'female', 1);