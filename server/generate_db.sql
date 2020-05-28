CREATE TABLE counties (
	id      INT         NOT NULL,
    name    VARCHAR(20)
	PRIMARY KEY (id)
);

INSERT INTO counties (id, name)
VALUES 
    (1,	'București'),
    (2,	'Timiș'),
    (3,	'Constanța'),
    (4,	'Cluj'),
    (5,	'Prahova'),
    (6,	'Brașov'),
    (7,	'Iași'),
    (8,	'Ilfov'),
    (9,	'Argeș'),
    (10,	'Dolj'),
    (11,	'Bihor'),
    (12,	'Mureș'),
    (13,	'Sibiu'),
    (14,	'Arad'),
    (15,	'Bacău'),
    (16,	'Suceava'),
    (17,	'Dâmbovița'),
    (18,	'Galați'),
    (19,	'Maramureș'),
    (20,	'Alba'),
    (21,	'Gorj'),
    (22,	'Hunedoara'),
    (23,	'Buzău'),
    (24,	'Vâlcea'),
    (25,	'Neamț'),
    (26,	'Olt'),
    (27,	'Satu'),
    (28,	'Brăila'),
    (29,	'Caraș'),
    (30,	'Bistrița'),
    (31,	'Harghita'),
    (32,	'Vrancea'),
    (33,	'Teleorman'),
    (34,	'Botoșani'),
    (35,	'Giurgiu'),
    (36,	'Ialomița'),
    (37,	'Călărași'),
    (38,	'Vaslui'),
    (39,	'Sălaj'),
    (40,	'Tulcea'),
    (41,	'Mehedinți'),
    (42,	'Covasna');


CREATE TABLE lots (
    id      int             IDENTITY(1, 1)   PRIMARY KEY
    name    VARCHAR(20)     NOT NULL
);

INSERT INTO lots (id, name)
VALUES 
    (1, 'Nedivizionar'),
    (2, 'Divizionar A'),
    (3, 'Divizionar B'),
    (4, 'Divizionar C');


CREATE TABLE categories (
    id      int             IDENTITY(1, 1) PRIMARY KEY
    name    VARCHAR(20)     NOT NULL
);

INSERT INTO categories (id, name)
VALUES 
    (1, 'International'),
    (2, 'Republican'),
    (3, 'I'),
    (4, 'II'),
    (5, 'III'),
    (6, 'IV');


CREATE TABLE users (
	id          int IDENTITY(1,1) PRIMARY KEY,
    username    VARCHAR(30) NOT NULL,
    password    VARCHAR(60) NOT NULL
);




CREATE TABLE sensitive_info (
    id              int         IDENTITY(1, 1) PRIMARY KEY,
    first_name      VARCHAR(30) NOT NULL,
    last_name       VARCHAR(30) NOT NULL,
    personal_email  VARCHAR(30) NOT NULL,
);

CREATE TABLE referees (
    id                  int IDENTITY(1, 1) PRIMARY KEY,
    id_user             int FOREIGN KEY REFERENCES users(id),
    id_lot              int FOREIGN KEY REFERENCES lots(id),
    id_category         int FOREIGN KEY REFERENCES categories(id),
    id_county           int FOREIGN KEY REFERENCES counties(id),
    id_sensitive_info   int FOREIGN KEY REFERENCES sensitive_info(id)
);