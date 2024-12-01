use smile;
CREATE TABLE student (
    id INT NOT NULL AUTO_INCREMENT,
    version INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(25),
    courses VARCHAR(255),
    batch VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE Staff (
    id INT NOT NULL AUTO_INCREMENT,
    version INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(25),
    department VARCHAR(255),
    designation VARCHAR(255),
    PRIMARY KEY (id)
);