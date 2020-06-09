INSERT INTO County (Name)
VALUES 
    ('București'),
    ('Timiș'),
    ('Constanța'),
    ('Cluj'),
    ('Prahova'),
    ('Brașov'),
    ('Iași'),
    ('Ilfov'),
    ('Argeș'),
    ('Dolj'),
    ('Bihor'),
    ('Mureș'),
    ('Sibiu'),
    ('Arad'),
    ('Bacău'),
    ('Suceava'),
    ('Dâmbovița'),
    ('Galați'),
    ('Maramureș'),
    ('Alba'),
    ('Gorj'),
    ('Hunedoara'),
    ('Buzău'),
    ('Vâlcea'),
    ('Neamț'),
    ('Olt'),
    ('Satu-Mare'),
    ('Brăila'),
    ('Caraș-Severin'),
    ('Bistrița'),
    ('Harghita'),
    ('Vrancea'),
    ('Teleorman'),
    ('Botoșani'),
    ('Giurgiu'),
    ('Ialomița'),
    ('Călărași'),
    ('Vaslui'),
    ('Sălaj'),
    ('Tulcea'),
    ('Mehedinți'),
    ('Covasna');
GO

INSERT INTO Lot (Name)
VALUES 
    ('Nedivizionar'),
    ('Divizionar A'),
    ('Divizionar B'),
    ('Divizionar C'),
    ('Observator');
GO

INSERT INTO Category (Name)
VALUES 
    ('International'),
    ('Republican'),
    ('I'),
    ('II'),
    ('III'),
    ('IV'),
    ('Observator');
GO

INSERT INTO [dbo].[Sex] (Name)
VALUES
    ('M'),
    ('F');

INSERT INTO Competition (Name)
VALUES
    ('Divizia A1'),
    ('Cupa Romaniei'),
    ('Supercupa Romaniei'),
    ('Divizia A2 Est'),
    ('Divizia A2 Vest'),
    ('Amical'),
    ('Campionat National');

INSERT INTO CompetitionSex(CompetitionID, SexID)
VALUES
    (1,1),
    (1,2),
    (2,1),
    (2,2),
    (3,1),
    (3,2),
    (4,1),
    (4,2),
    (5,1),
    (5,2),
    (6,1),
    (6,2),
    (7,1),
    (7,2);

INSERT INTO TeamLevel (Name)
VALUES
('Seniori'),
('Juniori'),
('Cadeti'),
('Sperante'),
('Minivolei');

INSERT INTO CompetitionSexLevel(CompetitionSexID, TeamLevelID)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (9, 1),
    (10, 1),
    (11, 2),
    (11, 3),
    (11, 4),
    (11, 5),
    (12, 2),
    (12, 3),
    (12, 4),
    (12, 5),
    (13, 1),
    (13, 2),
    (13, 3),
    (13, 4),
    (13, 5),
    (13, 1),
    (14, 2),
    (14, 3),
    (14, 4),
    (14, 5);

INSERT INTO [dbo].[CompetitionInstance] (CompetitionSexLevelID, SeasonID)
VALUES
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1),
(60, 1),
(61, 1),
(62, 1),
(63, 1),
(64, 1),
(65, 1),
(66, 1);