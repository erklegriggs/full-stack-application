drop database if exists mxtape;
create database mxtape;
use mxtape;

CREATE TABLE users (
  id varchar(36) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  role varchar(50) NOT NULL,
  enabled tinyint NOT NULL,

  PRIMARY KEY (id)
  
);

create table spring_session (
	primary_id char(36) not null,
	session_id char(36) not null,
	creation_time bigint not null,
	last_access_time bigint not null,
	max_inactive_interval int not null,
	expiry_time bigint not null,
	principal_name varchar(100),
	constraint spring_session_pk primary key (primary_id)
);

CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE mixtapes (
    mixtape_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    genre_id INT NOT NULL,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(624),
    date DATE NOT NULL,
    mixtape_pic_url VARCHAR(256),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE songs (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    mixtape_id INT NOT NULL,
    name VARCHAR(64) NOT NULL,
    duration INT,
    song_pic_url VARCHAR(256) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mixtape_id) REFERENCES mixtapes(mixtape_id) ON DELETE CASCADE
);

CREATE TABLE likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    mixtape_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mixtape_id) REFERENCES mixtapes(mixtape_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_mixtape (user_id, mixtape_id)
);


