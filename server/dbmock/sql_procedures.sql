

-- Procedure for fetching match history
CREATE PROCEDURE GetMatchHistory @Username varchar(30)
AS
SELECT
  M.MatchNo as 'MatchNumber',
  M.MatchDay as 'MatchDay',
  TI.Name as 'TeamAName',
  TI2.Name as 'TeamBName',
  SI.FirstName + ' ' + SI.LastName as 'FirstRefName',
  SI2.FirstName + ' ' + SI2.LastName as 'SecondRefName'
FROM[dbo].[Match] M
INNER JOIN[dbo].[Delegation] D
  ON M.DelegationID = D.ID
INNER JOIN[dbo].[MatchInfo] MI
  ON M.MatchInfoID = MI.ID
INNER JOIN[dbo].[Referee] R
  ON D.FirstRefereeID = R.ID
INNER JOIN[dbo].[Referee] R2
  ON D.SecondRefereeID = R2.ID
INNER JOIN[dbo].[TeamInfo] TI
  ON MI.TeamAID = TI.ID
INNER JOIN[dbo].[TeamInfo] TI2
  ON MI.TeamBID = TI2.ID
INNER JOIN[dbo].[SensitiveInfo] SI
  ON R.SensitiveInfoID = SI.ID
INNER JOIN[dbo].[SensitiveInfo] SI2
  ON R2.SensitiveInfoID = SI2.ID
INNER JOIN[dbo].[User] U
  ON (R.UserID = U.ID OR R2.UserID = U.ID)
WHERE U.Username = @Username;

-- Procedure for fetching personal info
CREATE PROCEDURE GetPersonalInfo @Username varchar(30)
AS
SELECT
    U.Username as Username,
    Cnt.Name as County,
    Cat.Name as Category,
    Lot.Name as Lot,
    R.FirstName as FirstName,
    R.LastName as LastName,
    R.Address as Address,
    R.PersonalEmail as Email,
    R.PhoneNumber as PhoneNumber
FROM [dbo].[Referee] R
INNER JOIN [dbo].[User] U ON R.UserID = U.ID
INNER JOIN [dbo].[County] Cnt ON R.CountyID = Cnt.ID
INNER JOIN [dbo].[Category] Cat ON R.CategoryID = Cat.ID
INNER JOIN [dbo].[Lot] Lot ON R.LotID = Lot.ID
WHERE U.Username = @Username;


-- Procedure for viewing all competitions
CREATE PROCEDURE GetCompetitions
AS
SELECT
    CSL.ID as 'ID',
    C.Name as 'Nume competitie',
    S.Name as 'Sex',
    TL.Name as 'Nivel profesional'
FROM [dbo].[CompetitionSexLevel] CSL
INNER JOIN [dbo].[CompetitionSex] CS
    ON CSL.CompetitionSexID = CS.ID
INNER JOIN [dbo].[Competition] C
    ON CS.CompetitionID = C.ID
INNER JOIN [dbo].[Sex] S
    ON CS.SexID = S.ID
INNER JOIN [dbo].[TeamLevel] TL
    ON CSL.TeamLevelID = TL.ID;


-- Procedure for adding a new season (parameters must be formated as dd-mm-yyyy strings)
CREATE PROCEDURE AddNewSeason
@Start varchar(30),
@End varchar(30)
AS
INSERT INTO [dbo].[Season] (StartDate, EndDate)
VALUES
(CONVERT(DATETIME, @Start, 105), CONVERT(DATETIME, @End, 105));

-- Get Unavailability Periods for a specific user
CREATE PROCEDURE GetUnavailabilityPeriods
@Username varchar(30)
AS
SELECT 
    UP.StartDate as 'StartDate',
    UP.EndDate as 'EndDate'
FROM [dbo].[UnavailabilityPeriod] UP
INNER JOIN[dbo].[Referee] R ON UP.RefereeID = R.ID
INNER JOIN[dbo].[User] U ON R.UserID = U.ID
WHERE U.Username = @Username;

-- Get User Info
CREATE PROCEDURE Getuserinfo @Username VARCHAR(30) 
AS 
    SELECT U.id, 
           UCR.competitioninstanceid,
           UCR.hasdelegationrights,
           UCR.hasapprovalrights,
           C.NAME 
    FROM   [dbo].[usercompetitionrights] UCR 
           INNER JOIN [dbo].[user] U 
                   ON UCR.userid = U.id 
           INNER JOIN [dbo].[competitioninstance] CI 
                   ON UCR.competitioninstanceid = CI.id 
           INNER JOIN [dbo].[competitionsexlevel] CSL 
                   ON CI.competitionsexlevelid = CSL.id 
           INNER JOIN [dbo].[competitionsex] CS 
                   ON CSL.competitionsexid = CS.id 
           INNER JOIN [dbo].[competition] C 
                   ON CS.competitionid = C.id 
    WHERE  U.username = @Username; 


-- Get My delegable matches (on which I can delegate someone)
CREATE PROCEDURE GetMyDelegableMatches @Username varchar(30)
AS
SELECT M.matchno, 
       M.matchday, 
       T1.NAME AS 'TeamA', 
       T2.NAME AS 'TeamB', 
       C.NAME  AS 'Competitie' 
FROM   [dbo].[match] M 
       INNER JOIN [dbo].[matchinfo] MI 
               ON M.matchinfoid = MI.id 
       INNER JOIN [dbo].[team] T1 
               ON MI.teamaid = T1.id 
       INNER JOIN team T2 
               ON MI.teambid = T2.id 
       INNER JOIN [dbo].[competitioninstance] CI 
               ON M.competitioninstanceid = CI.id 
       INNER JOIN [dbo].[competitionsexlevel] CSL 
               ON CI.competitionsexlevelid = CSL.id 
       INNER JOIN competitionsex CS 
               ON CSL.competitionsexid = CS.id 
       INNER JOIN competition C 
               ON CS.competitionid = C.id 
WHERE  M.competitioninstanceid IN (SELECT UCR.competitioninstanceid 
                                   FROM   [dbo].[usercompetitionrights] UCR 
                                          INNER JOIN [dbo].[user] U 
                                                  ON UCR.userid = U.id 
                                   WHERE  U.username = @Username); 

