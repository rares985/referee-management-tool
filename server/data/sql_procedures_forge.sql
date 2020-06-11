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
