INSERT INTO TeamInfo(Name, CountyID)
VALUES
  ('CS U Cluj',4), -- 1
  ('CS Unirea Dej',4), -- 2
  ('SCM Gloria Buzau',23), -- 3
  ('ACS Volei Municipal Zalau',39), -- 4
  ('CSM Arcada Galati',18), -- 5
  ('SCMU Craiova',10), -- 6
  ('CS UV Timisoara',2), -- 7
  ('CSM Campia Turzii',4), -- 8
  ('CS Stiinta Explorari Baia Mare',19), -- 9
  ('CS Dinamo Bucuresti',1); -- 10


INSERT INTO SensitiveInfo (FirstName, LastName, Address, PersonalEmail, PhoneNumber)
VALUES
('Andrei',    'Savu',         'Cluj-Napoca, Independentei 3', 'andrei.savu@yahoo.com', '0712345678'), -- 1
('Tudor',     'Pop',          'Cluj-Napoca, Independentei 4', 'poptudor@gmail.com', '0712035679'), -- 2 
('Lucian',    'Husa',         'Cluj-Napoca, Independentei 3', 'husalucian@yahoo.com', '0719345678'), -- 3
('Mircea',    'Rus',          'Cluj-Napoca, Independentei 3', 'rusmircea@yahoo.com', '0712347878'), -- 4
('Cristian',  'Serei',        'Cluj-Napoca, Independentei 3', 'sereicristian@yahoo.com', '0712345678'), -- 5
('Daniel',    'Hadade',       'Cluj-Napoca, Independentei 3', 'hadadedaniel@yahoo.com', '0778345678'), -- 6
('Paul',      'Szabo-Alexi',  'Cluj-Napoca, Independentei 3', 'szaboalexipaul@yahoo.com', '0712345678'), -- 7
('Ionut',     'Buciu',        'Cluj-Napoca, Independentei 3', 'buciuionut@gmail.com', '0712655678'), -- 8
('Darius',    'Mesca',        'Cluj-Napoca, Independentei 3', 'mescadarius@yahoo.com', '0712345678'), -- 9
('Marius',    'Stefurac',     'Cluj-Napoca, Independentei 3', 'maristefurac@yahoo.com', '0712235678'), -- 10
('Lucian',    'Nastase',      'Cluj-Napoca, Independentei 3', 'nastaselucian@yahoo.com', '0712345678'), -- 11
('Alin',      'Mateizer',     'Cluj-Napoca, Independentei 3', 'alinmateizer@yahoo.com', '0712343678'), -- 12
('Cornel',    'Gorban',       'Cluj-Napoca, Independentei 3', 'gorbancornel@yahoo.com', '0712345678'), -- 13
('Cristian',  'Ouatu',        'Cluj-Napoca, Independentei 3', 'ouatucristian@yahoo.com', '0712345678'), -- 14
('Octavian',  'Diaconita',    'Cluj-Napoca, Independentei 3', 'diaconitaoctavian@yahoo.com', '0722345678'), -- 15
('Cristian',  'Santa',        'Cluj-Napoca, Independentei 3', 'santacristian@yahoo.com', '0712345678'); -- 16


INSERT INTO Referee(UserID, LotID, CategoryID, CountyID, SensitiveInfoID)
VALUES
(1,2, 1, 4,1),
(2,2, 1, 4,2),
(3,2, 1, 4,3),
(4,2, 1, 4,4),
(5,2, 1, 19,5),
(6,2, 1, 39,6),
(7,2, 1, 11,7),
(8,2, 1, 39,8),
(9,2, 1, 5,9),
(10,2, 2, 5,10),
(11,2, 2, 18,11),
(12,2, 2, 5,12),
(13,2, 2, 7,13),
(14,2, 2, 25,14),
(15,2, 2, 25,15),
(16,2, 2, 4,16);


INSERT INTO Delegation (FirstRefereeID, SecondRefereeID)
VALUES
(1, 2),
(3, 4),
(5, 6),
(7, 8),
(9, 10),
(14, 15),
(11, 12),
(5, 13),
(1, 16),
(7, 2);


INSERT INTO MatchInfo(TeamAID, TeamBID, Venue)
VALUES
  (9, 6, 'Baia Mare'),
  (4, 7, 'Zalau'),
  (2, 8, 'Dej'),
  (1, 10, 'Cluj'),
  (3, 5, 'Buzau'),
  (1, 3, 'Cluj'),
  (10, 2, 'Bucuresti'),
  (8, 4, 'Campia Turzii'),
  (7, 9, 'Timisoara'),
  (6, 5, 'Craiova');


INSERT INTO Competition (Name, Type)
VALUES
("A1 M", "Liga");

INSERT INTO Match(MatchNo, MatchDay, MatchInfoID, DelegationID, CompetitionID)
VALUES
(347, CONVERT(datetime,'11-01-20',5), 1,1,1),
(348, CONVERT(datetime,'11-01-20',5), 2,2,1),
(349, CONVERT(datetime,'11-01-20',5), 3,3,1),
(350, CONVERT(datetime,'11-01-20',5), 4,4,1),
(346, CONVERT(datetime,'22-01-20',5), 5,5,1),
(351, CONVERT(datetime,'18-01-20',5), 6,6,1),
(352, CONVERT(datetime,'18-01-20',5), 7,7,1),
(353, CONVERT(datetime,'18-01-20',5), 8,8,1),
(354, CONVERT(datetime,'18-01-20',5), 9,9,1),
(355, CONVERT(datetime,'18-01-20',5), 10,10,1);