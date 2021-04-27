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
  online bit NOT NULL,
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


-- insert values into tables
INSERT INTO interests (name) VALUES ('Sport');
INSERT INTO interests (name) VALUES ('Mathe');
INSERT INTO interests (name) VALUES ('Programmieren');

INSERT INTO profile (stamp, course, studytype, extroverted, frequency, online) VALUES ('2000-01-01 10:00:00', 'WI', 'audiovisuell', 3, 3, 1);

INSERT INTO interests_in_profile (profileID, interestID) VALUES (1, 1);
INSERT INTO interests_in_profile (profileID, interestID) VALUES (1, 2);

INSERT INTO person (stamp, fname, lname, birthdate, semester, gender, profileID) VALUES ('2000-01-01 10:00:00', 'Paula', 'Pudding', '2000-01-01', 3, 'female', 1);