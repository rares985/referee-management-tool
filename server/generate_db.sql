-- Tables containing static data, should never (or rarely) change
CREATE TABLE County (
	ID      INT         IDENTITY(1, 1) PRIMARY KEY
    Name    VARCHAR(20) NOT NULL
);

CREATE TABLE Lot (
    ID      int             IDENTITY(1, 1)   PRIMARY KEY
    Name    VARCHAR(20)     NOT NULL
);

CREATE TABLE Category (
    ID      int             IDENTITY(1, 1) PRIMARY KEY
    Name    VARCHAR(20)     NOT NULL
);

-- Table containing authentication info
CREATE TABLE User (
	ID          int IDENTITY(1,1) PRIMARY KEY,
    Username    VARCHAR(30) NOT NULL UNIQUE,
    Password    VARCHAR(60) NOT NULL
);


-- Tables containing business logic
CREATE TABLE SensitiveInfo (
    ID              int         IDENTITY(1, 1) PRIMARY KEY,
    FirstName       VARCHAR(30) NOT NULL,
    LastName        VARCHAR(30) NOT NULL,
    PersonalEmail   VARCHAR(30) NOT NULL,
    Address         VARCHAR(30),
    PhoneNumber     VARCHAR(10)
);

CREATE TABLE Referee (
    ID                  int IDENTITY(1, 1) PRIMARY KEY,
    UserID              int FOREIGN KEY REFERENCES User(ID),
    LotID               int FOREIGN KEY REFERENCES Lot(ID),
    CategoryID          int FOREIGN KEY REFERENCES Category(ID),
    CountyID            int FOREIGN KEY REFERENCES County(ID),
    SensitiveInfoID     int FOREIGN KEY REFERENCES SensitiveInfo(ID)
);


CREATE TABLE TeamInfo (
    ID                  int IDENTITY(1, 1) PRIMARY KEY,
    Name                VARCHAR(30) NOT NULL,
    CountyID            int FOREIGN KEY REFERENCES County(ID),
);

CREATE TABLE MatchInfo (
    ID                  int IDENTITY(1, 1) PRIMARY KEY,
    TeamAID             int FOREIGN KEY REFERENCES TeamInfo(ID),
    TeamBID             int FOREIGN KEY REFERENCES TeamInfo(ID),
    Venue               VARCHAR(30) NOT NULL
);

CREATE TABLE Delegation (
    ID                  int IDENTITY(1, 1) PRIMARY KEY,
    FirstRefereeID      int FOREIGN KEY REFERENCES Referee(ID),
    SecondRefereeID     int FOREIGN KEY REFERENCES Referee(ID),
)

CREATE TABLE Competition (
    ID                  int IDENTITY(1, 1) PRIMARY KEY,
    Name                VARCHAR(30) NOT NULL,
)

CREATE TABLE Match (
    ID                  int IDENTITY(1, 1) PRIMARY KEY
    MatchNo             VARCHAR(3) NOT NULL, -- might have to be removed, depends on other cols(2,3nf)
    PlayTime            DATETIME NOT NULL, 
    MatchInfoID         int FOREIGN KEY REFERENCES MatchInfo(ID),
    DelegationID        int FOREIGN KEY REFERENCES Delegation(ID),
    CompetitionID       int FOREIGN KEY REFERENCES Competition(ID),
);




/* Query to get referees info based on user id */
SELECT 
    Cat.Name as Categorie,
    l.Name as Lot,
    Cnt.Name as Judet,
    SensInfo.FirstName as Prenume,
    SensInfo.LastName as Nume,
    SensInfo.PersonalEmail as Email
FROM Referee Ref
INNER JOIN Category Cat
    ON Cat.ID=Ref.CategoryID
INNER JOIN Lot l
    ON l.ID=Ref.LotID
INNER JOIN County Cnt
    ON Cnt.ID=Ref.CountyID
INNER JOIN SensitiveInfo SensInfo
    ON SensInfo.ID=Ref.SensitiveInfoID

/* Query to get matches displayed in /matches route */
SELECT 
    M.MatchNo,
    M.MatchDay,
    TI.Name,
    TI2.Name,
    SI.FirstName + ', ' + SI.LastName AS 'A1',
    SI2.FirstName + ', ' + SI2.LastName AS 'A2'
FROM Match M
INNER JOIN  MatchInfo MI
    ON M.MatchInfoID=MI.ID
INNER JOIN TeamInfo TI
    ON MI.TeamAID=TI.ID
INNER JOIN TeamInfo TI2
    ON MI.TeamBID=TI2.ID
INNER JOIN Delegation D
    ON M.DelegationID=D.ID
INNER JOIN Referee R
    ON D.FirstRefereeID=R.ID
INNER JOIN Referee R2
    ON D.SecondRefereeID=R2.ID
INNER JOIN SensitiveInfo SI
    ON R.SensitiveInfoID=SI.ID
INNER JOIN SensitiveInfo SI2
    ON R2.SensitiveInfoID=SI2.ID




CREATE TABLE [County] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(20) UNIQUE NOT NULL
)
GO

CREATE TABLE [Lot] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(20) UNIQUE NOT NULL
)
GO

CREATE TABLE [Category] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(20) UNIQUE NOT NULL
)
GO

CREATE TABLE [User] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Username] varchar(30) UNIQUE NOT NULL,
  [Password] varchar(60) NOT NULL
  [AccessLevelID] int NOT NULL
)
GO

CREATE TABLE [Referee] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [UserID] int NOT NULL,
  [LotID] int NOT NULL,
  [CategoryID] int NOT NULL,
  [CountyID] int NOT NULL,
  [SensitiveInfoID] int NOT NULL
)
GO

CREATE TABLE [SensitiveInfo] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] varchar(20) NOT NULL,
  [LastName] varchar(20) NOT NULL,
  [Address] varchar(30) NOT NULL,
  [PersonalEmail] varchar(30) NOT NULL,
  [PhoneNumber] varchar(10) NOT NULL
)
GO

CREATE TABLE [TeamInfo] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(30) UNIQUE NOT NULL,
  [CountyID] int
)
GO

CREATE TABLE [MatchInfo] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [TeamAID] int,
  [TeamBID] int,
  [Venue] varchar(20)
)
GO

CREATE TABLE [Delegation] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [FirstRefereeID] int NOT NULL,
  [SecondRefereeID] int NOT NULL
)
GO

CREATE TABLE [Match] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [MatchNo] varchar(3) NOT NULL,
  [MatchDay] datetime NOT NULL,
  [MatchInfoID] int,
  [DelegationID] int,
  [CompetitionID] int
)
GO

CREATE TABLE [Competition] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(30) NOT NULL,
  [Type] nvarchar(255) NOT NULL CHECK ([Type] IN ('League', 'Cup'))
)
GO

CREATE TABLE [AccessLevel] (
    [ID] int PRIMARY KEY IDENTITY(1, 1),
    [Name] varchar(30) NOT NULL,
)
GO

CREATE TABLE [UnavailabilityPeriod] (
    [ID] int PRIMARY KEY IDENTITY(1, 1),
    [StartDate] datetime NOT NULL,
    [EndDate] datetime NOT NULL,
    [RefereeID] int NOT NULL,
)
GO

ALTER TABLE [Referee] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([ID])
GO

ALTER TABLE [Referee] ADD FOREIGN KEY ([LotID]) REFERENCES [Lot] ([ID])
GO

ALTER TABLE [Referee] ADD FOREIGN KEY ([CategoryID]) REFERENCES [Category] ([ID])
GO

ALTER TABLE [Referee] ADD FOREIGN KEY ([CountyID]) REFERENCES [County] ([ID])
GO

ALTER TABLE [Referee] ADD FOREIGN KEY ([SensitiveInfoID]) REFERENCES [SensitiveInfo] ([ID])
GO

ALTER TABLE [Match] ADD FOREIGN KEY ([MatchInfoID]) REFERENCES [MatchInfo] ([ID])
GO

ALTER TABLE [Match] ADD FOREIGN KEY ([DelegationID]) REFERENCES [Delegation] ([ID])
GO

ALTER TABLE [MatchInfo] ADD FOREIGN KEY ([TeamAID]) REFERENCES [TeamInfo] ([ID])
GO

ALTER TABLE [MatchInfo] ADD FOREIGN KEY ([TeamBID]) REFERENCES [TeamInfo] ([ID])
GO

ALTER TABLE [TeamInfo] ADD FOREIGN KEY ([CountyID]) REFERENCES [County] ([ID])
GO

ALTER TABLE [Delegation] ADD FOREIGN KEY ([FirstRefereeID]) REFERENCES [Referee] ([ID])
GO

ALTER TABLE [Delegation] ADD FOREIGN KEY ([SecondRefereeID]) REFERENCES [Referee] ([ID])
GO

ALTER TABLE [UserID] ADD FOREIGN KEY ([AccessLevelID]) REFERENCES [AccessLevel] ([ID])
GO

ALTER TABLE [UnavailabilityPeriod] ADD FOREIGN KEY ([RefereeID]) REFERENCES [Referee] ([ID])
GO
