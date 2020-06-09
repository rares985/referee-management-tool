CREATE TABLE [County] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(30) UNIQUE NOT NULL
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

CREATE TABLE [Sex] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(1) UNIQUE NOT NULL
)
GO

CREATE TABLE [User] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Username] varchar(30) UNIQUE NOT NULL,
  [Password] varchar(60) NOT NULL
)
GO

CREATE TABLE [Referee] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [UserID] int UNIQUE NOT NULL,
  [LotID] int NOT NULL,
  [CategoryID] int NOT NULL,
  [CountyID] int NOT NULL,
  [FirstName] varchar(20) NOT NULL,
  [LastName] varchar(20) NOT NULL,
  [Address] varchar(60) NOT NULL,
  [PersonalEmail] varchar(30) NOT NULL,
  [PhoneNumber] varchar(10) NOT NULL
)
GO

CREATE TABLE [Match] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [MatchNo] varchar(3) NOT NULL,
  [MatchDay] date NOT NULL,
  [MatchInfoID] int NOT NULL,
  [DelegationID] int NOT NULL,
  [CompetitionInstanceID] int NOT NULL
)
GO

CREATE TABLE [MatchInfo] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [TeamAID] int NOT NULL,
  [TeamBID] int NOT NULL,
  [Venue] varchar(20) NOT NULL
)
GO

CREATE TABLE [Delegation] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [FirstRefereeID] int NOT NULL,
  [SecondRefereeID] int NOT NULL
)
GO

CREATE TABLE [Season] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [StartDate] date UNIQUE NOT NULL,
  [EndDate] date UNIQUE NOT NULL
)
GO

CREATE TABLE [Competition] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(30) UNIQUE NOT NULL
)
GO

CREATE TABLE [CompetitionSex] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [CompetitionID] int NOT NULL,
  [SexID] int NOT NULL
)
GO

CREATE TABLE [CompetitionSexLevel] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [CompetitionSexID] int NOT NULL,
  [TeamLevelID] int NOT NULL
)
GO

CREATE TABLE [TeamLevel] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(20) UNIQUE NOT NULL
)
GO

CREATE TABLE [CompetitionInstance] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [CompetitionSexLevelID] int NOT NULL,
  [SeasonID] int UNIQUE NOT NULL
)
GO

CREATE TABLE [CompetitionEligibleReferee] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [CompetitionInstanceID] int NOT NULL,
  [RefereeID] int NOT NULL
)
GO

CREATE TABLE [UserCompetitionRights] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [UserID] int NOT NULL,
  [CompetitionInstanceID] int NOT NULL,
  [HasDelegationRights] bit NOT NULL,
  [HasAccessRights] bit NOT NULL
)
GO

CREATE TABLE [DelegationDraft] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [CreatedBy] int NOT NULL,
  [MatchID] int NOT NULL,
  [FirstRefereeID] int NOT NULL,
  [SecondRefereeID] int NOT NULL,
  [FirstRefereeState] nvarchar(255) CHECK ([FirstRefereeState] IN ('None', 'Deferred', 'Pending', 'Accepted')) NOT NULL,
  [SecondRefereeState] nvarchar(255) CHECK ([SecondRefereeState] IN ('None', 'Deferred', 'Pending', 'Accepted')) NOT NULL
)
GO

CREATE TABLE [UnavailabilityPeriod] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [StartDate] date NOT NULL,
  [EndDate] date NOT NULL,
  [RefereeID] int NOT NULL
)
GO

CREATE TABLE [Team] (
  [ID] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar(30) NOT NULL,
  [CountyID] int NOT NULL,
  [TeamLevelID] int NOT NULL,
  [SexID] int NOT NULL
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

ALTER TABLE [Match] ADD FOREIGN KEY ([MatchInfoID]) REFERENCES [MatchInfo] ([ID])
GO

ALTER TABLE [Match] ADD FOREIGN KEY ([DelegationID]) REFERENCES [Delegation] ([ID])
GO

ALTER TABLE [Match] ADD FOREIGN KEY ([CompetitionInstanceID]) REFERENCES [CompetitionInstance] ([ID])
GO

ALTER TABLE [MatchInfo] ADD FOREIGN KEY ([TeamAID]) REFERENCES [Team] ([ID])
GO

ALTER TABLE [MatchInfo] ADD FOREIGN KEY ([TeamBID]) REFERENCES [Team] ([ID])
GO

ALTER TABLE [Delegation] ADD FOREIGN KEY ([FirstRefereeID]) REFERENCES [CompetitionEligibleReferee] ([ID])
GO

ALTER TABLE [Delegation] ADD FOREIGN KEY ([SecondRefereeID]) REFERENCES [CompetitionEligibleReferee] ([ID])
GO

ALTER TABLE [CompetitionSex] ADD FOREIGN KEY ([CompetitionID]) REFERENCES [Competition] ([ID])
GO

ALTER TABLE [CompetitionSex] ADD FOREIGN KEY ([SexID]) REFERENCES [Sex] ([ID])
GO

ALTER TABLE [CompetitionSexLevel] ADD FOREIGN KEY ([CompetitionSexID]) REFERENCES [CompetitionSex] ([ID])
GO

ALTER TABLE [CompetitionSexLevel] ADD FOREIGN KEY ([TeamLevelID]) REFERENCES [TeamLevel] ([ID])
GO

ALTER TABLE [CompetitionInstance] ADD FOREIGN KEY ([CompetitionSexLevelID]) REFERENCES [CompetitionSexLevel] ([ID])
GO

ALTER TABLE [CompetitionInstance] ADD FOREIGN KEY ([SeasonID]) REFERENCES [Season] ([ID])
GO

ALTER TABLE [CompetitionEligibleReferee] ADD FOREIGN KEY ([CompetitionInstanceID]) REFERENCES [CompetitionInstance] ([ID])
GO

ALTER TABLE [CompetitionEligibleReferee] ADD FOREIGN KEY ([RefereeID]) REFERENCES [Referee] ([ID])
GO

ALTER TABLE [UserCompetitionRights] ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([ID])
GO

ALTER TABLE [UserCompetitionRights] ADD FOREIGN KEY ([CompetitionInstanceID]) REFERENCES [CompetitionInstance] ([ID])
GO

ALTER TABLE [DelegationDraft] ADD FOREIGN KEY ([CreatedBy]) REFERENCES [User] ([ID])
GO

ALTER TABLE [DelegationDraft] ADD FOREIGN KEY ([MatchID]) REFERENCES [Match] ([ID])
GO

ALTER TABLE [DelegationDraft] ADD FOREIGN KEY ([FirstRefereeID]) REFERENCES [CompetitionEligibleReferee] ([ID])
GO

ALTER TABLE [DelegationDraft] ADD FOREIGN KEY ([SecondRefereeID]) REFERENCES [CompetitionEligibleReferee] ([ID])
GO

ALTER TABLE [UnavailabilityPeriod] ADD FOREIGN KEY ([RefereeID]) REFERENCES [Referee] ([ID])
GO

ALTER TABLE [Team] ADD FOREIGN KEY ([CountyID]) REFERENCES [County] ([ID])
GO

ALTER TABLE [Team] ADD FOREIGN KEY ([TeamLevelID]) REFERENCES [TeamLevel] ([ID])
GO

ALTER TABLE [Team] ADD FOREIGN KEY ([SexID]) REFERENCES [Sex] ([ID])
GO
