CREATE DATABASE IF NOT EXISTS selectri CHARSET utf8mb4;
CREATE USER 'selectri_user'@'localhost' IDENTIFIED BY 'mon_mot_de_passe'; 
GRANT ALL PRIVILEGES ON selectri.* TO 'selectri_user'@'localhost'; 
FLUSH PRIVILEGES; 

use selectri; 
CREATE TABLE IF NOT EXISTS `role` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE
) ENGINE = InnoDB;

CREATE TABLE  IF NOT EXISTS `account` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    reset_token VARCHAR(255),
    reset_token_expires_at DATETIME,
    id_role INT NOT NULL,
    CONSTRAINT fk_account_role FOREIGN KEY (id_role) REFERENCES `role`(id)
) ENGINE = InnoDB;

-- TABLES LIEES AUX DECHETS ----
CREATE TABLE  IF NOT EXISTS waste_site (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    latitude DECIMAL(11, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    opening_hours VARCHAR(255) NULL,
    site_type VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS waste_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL UNIQUE,
    co2_value_kg DECIMAL(6, 2),   -- indicatif, peut manquer selon la source API
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS waste_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL UNIQUE,
    id_waste_category INT,   -- 0,1 : certains dechets API n'ont pas de type precis
    CONSTRAINT fk_waste_type_category FOREIGN KEY (id_waste_category) REFERENCES waste_category (id) ON DELETE CASCADE
) ENGINE = InnoDB;


-- les consignes de tri liés aux déchets --
CREATE TABLE IF NOT EXISTS instruction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME, 
    id_waste_category INT NOT NULL,   -- 1,1 : une consigne appartient a exactement une categorie
    CONSTRAINT fk_instruction_category FOREIGN KEY (id_waste_category) REFERENCES waste_category (id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tips_content TEXT NOT NULL
) ENGINE = InnoDB;

CREATE TABLE  IF NOT EXISTS badge (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    limit_value INT NOT NULL,
    image VARCHAR(255),
    `description` TEXT,
    badge_type VARCHAR(50) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE  IF NOT EXISTS challenge (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    expired_at DATETIME NULL,
    estimated_co2_kg DECIMAL(8, 2) NOT NULL,   -- indicatif
    frequency VARCHAR(50),
    `description` TEXT NOT NULL
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- repairer (Navigation et recherche - carte des reparateurs labellises)
-- Table isolee dans MCD/MLD(pas encore de relation modelisee).
-- ---------------------------------------------------------------------

CREATE TABLE  IF NOT EXISTS repairer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    latitude DECIMAL(11, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address VARCHAR(255) NOT NULL,
    service VARCHAR(255) NOT NULL
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------
-- Tables de jonction 
-- ---------------------------------------------------------------------

-- accept : waste_site (0,n) <-> waste_category (0,n)
CREATE TABLE IF NOT EXISTS waste_site_category (
    id_waste_category INT NOT NULL,
    id_waste_site INT NOT NULL,
    PRIMARY KEY (id_waste_category, id_waste_site),
    CONSTRAINT fk_accept_category FOREIGN KEY (id_waste_category) REFERENCES waste_category (id) ON DELETE CASCADE,
    CONSTRAINT fk_accept_waste_site FOREIGN KEY (id_waste_site) REFERENCES waste_site (id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- apply : waste_category (0,n) <-> tips (0,n)
CREATE TABLE IF NOT EXISTS waste_category_tip (
    id_waste_category INT NOT NULL,
    id_tips INT NOT NULL,
    PRIMARY KEY (id_waste_category, id_tips),
    CONSTRAINT fk_apply_category FOREIGN KEY (id_waste_category) REFERENCES waste_category (id) ON DELETE CASCADE,
    CONSTRAINT fk_apply_tips FOREIGN KEY (id_tips) REFERENCES tips (id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- earn : account (0,n) <-> badge (0,n)
CREATE TABLE IF NOT EXISTS account_badge (
    id_account INT NOT NULL,
    id_badge INT NOT NULL,
    earned_at DATETIME NOT NULL,
    PRIMARY KEY (id_account, id_badge),
    CONSTRAINT fk_earn_account FOREIGN KEY (id_account) REFERENCES `account` (id) ON DELETE CASCADE,
    CONSTRAINT fk_earn_badge FOREIGN KEY (id_badge) REFERENCES badge (id)
) ENGINE = InnoDB;

-- participate : account (0,n) <-> challenge (0,n)
CREATE TABLE  IF NOT EXISTS challenge_participation (
    id_account INT NOT NULL,
    id_challenge INT NOT NULL,
    completed_at DATETIME,
    PRIMARY KEY (id_account, id_challenge),
    CONSTRAINT fk_participate_account FOREIGN KEY (id_account) REFERENCES  `account` (id) ON DELETE CASCADE,
    CONSTRAINT fk_participate_challenge FOREIGN KEY (id_challenge) REFERENCES challenge (id)
) ENGINE = InnoDB;

-- target : waste_category (0,n) <-> challenge (1,n)
CREATE TABLE IF NOT EXISTS challenge_waste_category (
    id_waste_category INT NOT NULL,
    id_challenge INT NOT NULL,
    PRIMARY KEY (id_waste_category, id_challenge),
    CONSTRAINT fk_target_category FOREIGN KEY (id_waste_category) REFERENCES waste_category (id) ON DELETE CASCADE,
    CONSTRAINT fk_target_challenge FOREIGN KEY (id_challenge) REFERENCES challenge (id) ON DELETE CASCADE
) ENGINE = InnoDB;









