-- create database
DROP DATABASE IF EXISTS teachingbee;
CREATE DATABASE teachingbee;

USE teachingbee;


-- create tables
DROP TABLE IF EXISTS interests;
CREATE TABLE interests (
  id int AUTO_INCREMENT,
  iname varchar(255) NOT NULL,  -- iname = interest name
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS profile;
CREATE TABLE profile (
  id int AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  course varchar(255) NOT NULL,
  studytype varchar(255) NOT NULL,  -- int or varchar?
  extroverted int NOT NULL,         -- value between 1 and 5
  frequency int NOT NULL,           -- value between 1 and 5
  online int NOT NULL,              -- online is either 1 or 0 (0 = offline)
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS r_interests_profile;
CREATE TABLE r_interests_profile (
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
  fname varchar(100) NOT NULL,    -- fname = first name
  lname varchar(100) NOT NULL,    -- lname = last name
  birthdate date NOT NULL,
  semester int NOT NULL,
  gender varchar(100) NOT NULL,   -- or int?
  profileID int,
  PRIMARY KEY (id),
  FOREIGN KEY (profileID) REFERENCES profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS studygroup;
CREATE TABLE studygroup (
  id int NOT NULL AUTO_INCREMENT,
  stamp timestamp NOT NULL,
  gname varchar(255),         -- gname = group name
  head int NOT NULL,          -- head = group admin
  PRIMARY KEY (id),
  FOREIGN KEY (head) REFERENCES person(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS r_person_group;
CREATE TABLE r_person_group (
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
  -- how to differentiate between group and person?
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

DROP TABLE IF EXISTS r_person_chat;
CREATE TABLE r_person_chat (
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
INSERT INTO interests (iname) VALUES ('Sport');
INSERT INTO interests (iname) VALUES ('Mathe');
INSERT INTO interests (iname) VALUES ('Programmieren');

INSERT INTO profile (stamp, course, studytype, extroverted, frequency, online) VALUES ('2000-01-01 10:00:00', 'WI', 'audiovisuell', 3, 3, 1);

INSERT INTO r_interests_profile (profileID, interestID) VALUES (1, 1);
INSERT INTO r_interests_profile (profileID, interestID) VALUES (1, 2);

INSERT INTO person (stamp, fname, lname, birthdate, semester, gender, profileID) VALUES ('2000-01-01 10:00:00', 'Paula', 'Pudding', '2000-01-01', 3, 'female', 1);