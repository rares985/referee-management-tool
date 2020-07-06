-------- User handling procedures (ADD, REMOVE) -------------------------------------------

-- Procedure for adding in the User Table
CREATE PROCEDURE RegisterNewUser @Username VARCHAR(50),
@Password VARCHAR(60)
AS
BEGIN
  SET NOCOUNT ON
  INSERT INTO [dbo].[USER] (username, password)
    VALUES (@Username, @Password);
END

-- Procedure for removing from the User Table
CREATE PROCEDURE DeleteUser @Username VARCHAR(50)
AS
BEGIN
  SET NOCOUNT ON
  DELETE FROM [dbo].[user]
  WHERE username = @Username;
END


-- Procedure for registering a new referee
CREATE PROCEDURE RegisterNewReferee @Username VARCHAR(50),
@Password VARCHAR(60),
@FirstName VARCHAR(30),
@LastName VARCHAR(30),
@Address VARCHAR(50),
@Email VARCHAR(50),
@PhoneNumber VARCHAR(10),
@LotName NVARCHAR(20),
@CountyName NVARCHAR(30),
@CategoryName NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON
  INSERT INTO [dbo].[USER] (username, password)
    VALUES (@Username, @Password);

  DECLARE @LotID INT;
  DECLARE @CategoryID INT;
  DECLARE @CountyID INT;

  SET @LotID = (SELECT
      id
    FROM lot
    WHERE name = @LotName);
  SET @CategoryID = (SELECT
      id
    FROM category
    WHERE name = @CategoryName);
  SET @CountyID = (SELECT
      id
    FROM county
    WHERE name = @CountyName);

  INSERT INTO referee (first_name, last_name, address, email, phone_number, user_id, lot_id, category_id, county_id)
    VALUES (@FirstName, @LastName, @Address, @Email, @PhoneNumber, SCOPE_IDENTITY(), @LotID, @CategoryID, @CountyID);

END


-- Procedure for adding a new Unavailability Period
CREATE PROCEDURE AddUnavailabilityPeriod @Username VARCHAR(50),
@Reason NVARCHAR(50),
@StartDate DATE,
@EndDate DATE
AS
BEGIN
  SET NOCOUNT ON
  DECLARE @RefereeID INT;
  SET @RefereeID = (SELECT
      r.id
    FROM referee r
    INNER JOIN [user] u
      ON r.user_id = u.id
    WHERE u.username = @Username);

  INSERT INTO unavailability_period (referee_id, start_date, end_date, reason)
    VALUES (@RefereeID, @StartDate, @EndDate, @Reason)
END

-- Example of how to call
EXEC AddUnavailabilityPeriod @Username = 'cjaprahova'
                            ,@Reason = N'suspendat'
                            ,@StartDate = '2020-06-15'
                            ,@EndDate = '2020-06-17'
-------------------------------------------------------------------------------------------------------------

-- Procedure for getting stored Unavailability Periods per person
CREATE PROCEDURE GetUnavailabilityPeriod @Username VARCHAR(50)
AS
BEGIN
  SET NOCOUNT ON
  SELECT
    up.start_date AS 'StartDate'
   ,up.end_date AS 'EndDate'
   ,up.reason AS 'Reason'
  FROM unavailability_period up
  INNER JOIN referee r
    ON up.referee_id = r.id
  INNER JOIN [user] u
    ON r.user_id = u.id
  WHERE u.Username = @Username;
END

-- Procedure for deleting stored Unavailability Period per person
CREATE PROCEDURE DeleteUnavailabilityPeriod @Username VARCHAR(50),
@StartDate DATE,
@EndDate DATE
AS
BEGIN
  SET NOCOUNT ON
  DECLARE @RefereeID INT;
  SET @RefereeID = (SELECT
      r.id
    FROM referee r
    INNER JOIN [user] u
      ON r.user_id = u.id
    WHERE u.username = @Username);
  DELETE FROM unavailability_period
  WHERE start_date = @StartDate
    AND end_date = @EndDate
    AND referee_id = @RefereeID
END

--- Example how to run
EXEC DeleteUnavailabilityPeriod @Username = 'cjaprahova'
                               ,@StartDate = '2020-06-15'
                               ,@EndDate = '2020-06-17'
-------------------------------------------------------------------------------------------------------------



-- Add entry in Referee table
CREATE PROCEDURE CreateRefereeEntry @Username VARCHAR(50),
@FirstName VARCHAR(30),
@LastName VARCHAR(30),
@Address VARCHAR(50),
@Email VARCHAR(50),
@PhoneNumber VARCHAR(10),
@LotName NVARCHAR(20),
@CountyName NVARCHAR(30),
@CategoryName NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON
  DECLARE @LotID INT;
  DECLARE @CategoryID INT;
  DECLARE @CountyID INT;
  DECLARE @UserID INT;


  SET @LotID = (SELECT
      id
    FROM lot
    WHERE name = @LotName);
  SET @CategoryID = (SELECT
      id
    FROM category
    WHERE name = @CategoryName);
  SET @CountyID = (SELECT
      id
    FROM county
    WHERE name = @CountyName);

  SET @UserID = (SELECT
      id
    FROM [user]
    WHERE username = @Username);

  INSERT INTO referee (first_name, last_name, address, email, phone_number, user_id, lot_id, category_id, county_id)
    VALUES (@FirstName, @LastName, @Address, @Email, @PhoneNumber, @UserID, @LotID, @CategoryID, @CountyID);

END

-- EXAMPLE HOW TO RUN ----
EXEC CreateRefereeEntry
  @Username = 'cjaprahova',
  @FirstName = 'CJA',
  @LastName = 'Prahova',
  @Address = 'Ploiesti, Bd. Independentei 5-7',
  @Email = 'alinmateizer@yahoo.com',
  @PhoneNumber = '0770235236',
  @LotName = 'Observator',
  @CountyName = 'Prahova',
  @CategoryName = 'Observator';



-- Get referees in county by countyid 
CREATE PROCEDURE GetRefereesInCounty @CountyID INT
AS
BEGIN
  SET NOCOUNT ON
  SELECT
    r.id
   ,r.first_name
   ,r.last_name
   ,r.address
   ,r.email
   ,r.phone_number
   ,lt.[name] AS 'lot'
   ,ct.[name] AS 'cat'
   ,cnt.[name] AS 'jud'
  FROM referee r
  INNER JOIN [dbo].[lot] lt
    ON r.lot_id = lt.id
  INNER JOIN category ct
    ON r.category_id = ct.id
  INNER JOIN county cnt
    ON r.county_id = cnt.id
  WHERE r.county_id = @CountyID;
END

-- Get UP per county
CREATE PROCEDURE GetUnavailabilityPeriodsPerCounty @CountyID INT
AS
BEGIN
  SET NOCOUNT ON
  SELECT
    r.id
   ,r.first_name
   ,r.last_name
   ,r.address
   ,r.email
   ,r.phone_number
   ,up.start_date
   ,up.end_date
   ,up.reason AS reason
   ,c.name AS category
   ,l.name AS lot
  FROM referee r
  INNER JOIN unavailability_period up
    ON r.id = up.referee_id
  INNER JOIN category c
    ON r.category_id = c.id
  INNER JOIN lot l
    ON r.lot_id = l.id
  WHERE r.county_id = 5
END


-- Procedure for getting personal information
CREATE PROCEDURE dbo.GetPersonalInfo @Username VARCHAR(50)
AS
BEGIN
  SET NOCOUNT ON
  SELECT
    r.id
   ,r.first_name
   ,r.last_name
   ,r.address
   ,r.email
   ,r.phone_number
   ,c.name AS jud
   ,c1.name AS cat
   ,l.name AS lot
  FROM referee r
  INNER JOIN [user] u
    ON r.user_id = u.id
  INNER JOIN county c
    ON r.county_id = c.id
  INNER JOIN category c1
    ON r.category_id = c1.id
  INNER JOIN lot l
    ON r.lot_id = l.id
  WHERE u.username = @Username
END
GO

-- Procedure for updating personal information
CREATE PROCEDURE UpdatePersonalInfo @Username VARCHAR(50),
@FirstName VARCHAR(30),
@LastName VARCHAR(30),
@Address VARCHAR(50),
@Email VARCHAR(50),
@PhoneNumber VARCHAR(10),
@LotName NVARCHAR(20),
@CountyName NVARCHAR(30),
@CategoryName NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON

    DECLARE @LotID INT;
    DECLARE @CategoryID INT;
    DECLARE @CountyID INT;
    DECLARE @UserID BIGINT;

  SET @LotID = (SELECT
      id
    FROM lot
    WHERE name = @LotName);
  SET @CategoryID = (SELECT
      id
    FROM category
    WHERE name = @CategoryName);
  SET @CountyID = (SELECT
      id
    FROM county
    WHERE name = @CountyName);

  SET @UserID = (SELECT
      id
    FROM [user]
    WHERE username = @Username);

  UPDATE referee
  SET first_name = @FirstName
     ,last_name = @LastName
     ,address = @Address
     ,email = @Email
     ,phone_number = @PhoneNumber
     ,lot_id = @LotID
     ,category_id = @CategoryID
     ,county_id = @CountyID
  WHERE user_id = @UserID;

END
GO


-- Procedure for creating a new competition 
CREATE PROCEDURE dbo.CreateNewCompetition @FullName NVARCHAR(80),
@AgeGroup NVARCHAR(20),
@Sex NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @AgeGroupID INT;
  DECLARE @SexID INT;

  SET @AgeGroupID = (SELECT
      id
    FROM age_group ag
    WHERE ag.name = @AgeGroup);
  SET @SexID = (SELECT
      id
    FROM sex s
    WHERE s.name = @Sex);

  INSERT INTO competition (full_name, age_group_id, sex_id)
    VALUES (@FullName, @AgeGroupID, @SexID);
END
GO


-- Procedure for adding a new season
CREATE PROCEDURE AddNewSeason @StartDate DATE,
@EndDate DATE
AS
BEGIN
  SET NOCOUNT ON;
  INSERT INTO season (start_date, end_date)
    VALUES (@StartDate, @EndDate)
END

EXEC AddNewSeason @StartDate = '2020-09-15'
                 ,@EndDate = '2021-05-30'


-- Procedure for adding a new team
CREATE PROCEDURE AddNewTeam @Name NVARCHAR(20),
@AgeGroup NVARCHAR(30),
@Sex NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @AgeGroupID INT;
  DECLARE @SexID INT;

  SET @AgeGroupID = (SELECT
      id
    FROM age_group ag
    WHERE ag.name = @AgeGroup);
  SET @SexID = (SELECT
      id
    FROM sex s
    WHERE s.name = @Sex);

  INSERT INTO team (name, age_group_id, sex_id)
    VALUES (@Name, @AgeGroupID, @SexID);
END


-- 
CREATE PROCEDURE dbo.GetRefereesEligibleForCompetition @CompetitionInstanceID INT
AS
BEGIN
  SELECT
    cer.referee_id
  FROM competition_eligible_referee cer
    INNER JOIN referee r ON cer.referee_id = r.id
  WHERE cer.competition_instance_id = @CompetitionInstanceID;
END
GO

