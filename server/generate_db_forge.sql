
------------------- user table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.[user] (
  id BIGINT IDENTITY
 ,username VARCHAR(50) NOT NULL
 ,password VARCHAR(60) NOT NULL
 ,CONSTRAINT PK_user_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_user_username UNIQUE (username)
)
GO

------------------- county table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.county (
  id INT IDENTITY
 ,name NVARCHAR(30) NOT NULL
 ,CONSTRAINT PK_county_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_county_name UNIQUE (name)
)
GO

------------------- lot table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.lot (
  id INT IDENTITY
 ,name NVARCHAR(20) NOT NULL
 ,CONSTRAINT PK_lot_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_lot_name UNIQUE (name)
)
GO

------------------- category table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.category (
  id INT IDENTITY
 ,name NVARCHAR(20) NOT NULL
 ,CONSTRAINT PK_category_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_category_name UNIQUE (name)
)
GO

------------------- sex table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.sex (
  id INT IDENTITY
 ,name NVARCHAR(20) NOT NULL
 ,abbreviation VARCHAR(3) NOT NULL
 ,CONSTRAINT PK_Sex_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_Sex_abbreviation UNIQUE (abbreviation)
 ,CONSTRAINT KEY_Sex_name UNIQUE (name)
)
GO

------------------- age_group table ----------------------------------------

CREATE TABLE [referee-management-tool].dbo.age_group (
  id INT IDENTITY
 ,name NVARCHAR(30) NOT NULL
 ,CONSTRAINT PK_age_group_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_age_group_name UNIQUE (name)
)
GO

------------------- team table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.team (
  id INT IDENTITY
 ,name NVARCHAR(20) NOT NULL
 ,age_group_id INT NOT NULL
 ,sex_id INT NOT NULL
 ,CONSTRAINT PK_team_id PRIMARY KEY CLUSTERED (id)
)
GO

ALTER TABLE [referee-management-tool].dbo.team
ADD CONSTRAINT FK_team_age_group_id FOREIGN KEY (age_group_id) REFERENCES dbo.age_group (id)
GO

ALTER TABLE [referee-management-tool].dbo.team
ADD CONSTRAINT FK_team_sex_id FOREIGN KEY (sex_id) REFERENCES dbo.sex (id)
GO

------------------- competition table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.competition (
  id INT IDENTITY
 ,full_name NVARCHAR(80) NOT NULL
 ,age_group_id INT NOT NULL
 ,sex_id INT NOT NULL
 ,CONSTRAINT PK_competition_id PRIMARY KEY CLUSTERED (id)
)
GO

ALTER TABLE [referee-management-tool].dbo.competition
ADD CONSTRAINT FK_competition_sex_id FOREIGN KEY (sex_id) REFERENCES dbo.sex (id)
GO

ALTER TABLE [referee-management-tool].dbo.competition
ADD CONSTRAINT FK_competition_age_group_id FOREIGN KEY (age_group_id) REFERENCES dbo.age_group (id)
GO

------------------- referee table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.referee (
  id INT IDENTITY
 ,first_name NVARCHAR(30) NOT NULL
 ,last_name NVARCHAR(30) NOT NULL
 ,address NVARCHAR(50) NOT NULL
 ,email VARCHAR(50) NOT NULL
 ,phone_number VARCHAR(10) NOT NULL
 ,user_id BIGINT NOT NULL
 ,lot_id INT NOT NULL
 ,category_id INT NOT NULL
 ,county_id INT NOT NULL
 ,CONSTRAINT PK_referee_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_referee_user_id UNIQUE (user_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.referee
ADD CONSTRAINT FK_referee_user_id FOREIGN KEY (user_id) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [referee-management-tool].dbo.referee
ADD CONSTRAINT FK_referee_lot_id FOREIGN KEY (lot_id) REFERENCES dbo.lot (id)
GO

ALTER TABLE [referee-management-tool].dbo.referee
ADD CONSTRAINT FK_referee_category_id FOREIGN KEY (category_id) REFERENCES dbo.category (id)
GO

ALTER TABLE [referee-management-tool].dbo.referee
ADD CONSTRAINT FK_referee_county_id FOREIGN KEY (county_id) REFERENCES dbo.county (id)
GO

------------------- season table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.season (
  id INT IDENTITY
 ,start_date DATE NOT NULL
 ,end_date DATE NOT NULL
 ,CONSTRAINT PK_season_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_season_start_date UNIQUE (start_date)
 ,CONSTRAINT KEY_season_end_date UNIQUE (end_date)
)
GO

------------------- competition_instance table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.competition_instance (
  id INT IDENTITY
 ,competition_id INT NOT NULL
 ,season_id INT NOT NULL
 ,CONSTRAINT PK_competition_instance_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_competition_instance_competition_id UNIQUE (competition_id)
 ,CONSTRAINT KEY_competition_instance_season_id UNIQUE (season_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.competition_instance
ADD CONSTRAINT FK_competition_instance_competition_id FOREIGN KEY (competition_id) REFERENCES dbo.competition (id)
GO

ALTER TABLE [referee-management-tool].dbo.competition_instance
ADD CONSTRAINT FK_competition_instance_season_id FOREIGN KEY (season_id) REFERENCES dbo.season (id)
GO

------------------- venue table ----------------------------------------

CREATE TABLE [referee-management-tool].dbo.venue (
  id INT IDENTITY
 ,location NVARCHAR(50) NOT NULL
 ,CONSTRAINT PK_venue_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_venue_location UNIQUE (location)
)
GO

------------------- match_info table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.match_info (
  id INT IDENTITY
 ,team_a_id INT NOT NULL
 ,team_b_id INT NOT NULL
 ,venue_id INT NOT NULL
 ,CONSTRAINT PK_match_info_id PRIMARY KEY CLUSTERED (id)
)
GO

ALTER TABLE [referee-management-tool].dbo.match_info
ADD CONSTRAINT FK_match_info_team_a_id FOREIGN KEY (team_a_id) REFERENCES dbo.team (id)
GO

ALTER TABLE [referee-management-tool].dbo.match_info
ADD CONSTRAINT FK_match_info_team_b_id FOREIGN KEY (team_b_id) REFERENCES dbo.team (id)
GO

ALTER TABLE [referee-management-tool].dbo.match_info
ADD CONSTRAINT FK_match_info_venue_id FOREIGN KEY (venue_id) REFERENCES dbo.venue (id)
GO

------------------- delegation table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.delegation (
  id INT IDENTITY
 ,first_referee_id INT NOT NULL
 ,second_referee_id INT NOT NULL
 ,observer_id INT NULL
 ,CONSTRAINT PK_delegation_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_delegation UNIQUE (first_referee_id, second_referee_id, observer_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.delegation
ADD CONSTRAINT FK_delegation_first_referee_id FOREIGN KEY (first_referee_id) REFERENCES dbo.referee (id)
GO

ALTER TABLE [referee-management-tool].dbo.delegation
ADD CONSTRAINT FK_delegation_second_referee_id FOREIGN KEY (second_referee_id) REFERENCES dbo.referee (id)
GO

ALTER TABLE [referee-management-tool].dbo.delegation
ADD CONSTRAINT FK_delegation_observer_id FOREIGN KEY (observer_id) REFERENCES dbo.referee (id)
GO
------------------- match table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.match (
  id INT IDENTITY
 ,match_no INT NOT NULL
 ,match_date DATETIME NOT NULL
 ,delegation_id INT NULL
 ,match_info_id INT NOT NULL
 ,competition_instance_id INT NOT NULL
 ,CONSTRAINT PK_match_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_match UNIQUE (match_no, season_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.match
ADD CONSTRAINT FK_match_delegation_id FOREIGN KEY (delegation_id) REFERENCES dbo.delegation (id)
GO

ALTER TABLE [referee-management-tool].dbo.match
ADD CONSTRAINT FK_match_match_info_id FOREIGN KEY (match_info_id) REFERENCES dbo.match_info (id)
GO

ALTER TABLE [referee-management-tool].dbo.match
ADD CONSTRAINT FK_match_competition_instance_id FOREIGN KEY (competition_instance_id) REFERENCES dbo.competition_instance (id)
GO


------------------- delegation_draft table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.delegation_draft (
  id INT IDENTITY
 ,created_by BIGINT NOT NULL
 ,first_referee_id INT NOT NULL
 ,second_referee_id INT NOT NULL
 ,observer_id INT NOT NULL
 ,match_id INT NOT NULL
 ,CONSTRAINT PK_delegation_draft_id PRIMARY KEY CLUSTERED (id)
)
GO

ALTER TABLE [referee-management-tool].dbo.delegation_draft
ADD CONSTRAINT FK_delegation_draft_created_by FOREIGN KEY (created_by) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [referee-management-tool].dbo.delegation_draft
ADD CONSTRAINT FK_delegation_draft_first_referee_id FOREIGN KEY (first_referee_id) REFERENCES dbo.referee (id)
GO

ALTER TABLE [referee-management-tool].dbo.delegation_draft
ADD CONSTRAINT FK_delegation_draft_match_id FOREIGN KEY (match_id) REFERENCES dbo.match (id)
GO

ALTER TABLE [referee-management-tool].dbo.delegation_draft
ADD CONSTRAINT FK_delegation_draft_observer_id FOREIGN KEY (observer_id) REFERENCES dbo.referee (id)
GO

ALTER TABLE [referee-management-tool].dbo.delegation_draft
ADD CONSTRAINT FK_delegation_draft_second_referee_id FOREIGN KEY (second_referee_id) REFERENCES dbo.referee (id)
GO

------------------- cja_user table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.cja_user (
  id INT IDENTITY
 ,user_id BIGINT NOT NULL
 ,county_id INT NOT NULL
 ,CONSTRAINT PK_cja_user_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_cja_user_county_id UNIQUE (county_id)
 ,CONSTRAINT KEY_cja_user_user_id UNIQUE (user_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.cja_user
ADD CONSTRAINT FK_cja_user_county_id FOREIGN KEY (county_id) REFERENCES dbo.county (id)
GO

ALTER TABLE [referee-management-tool].dbo.cja_user
ADD CONSTRAINT FK_cja_user_user_id FOREIGN KEY (user_id) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO

------------------- cca_user table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.cca_user (
  id INT IDENTITY
 ,user_id BIGINT NOT NULL
 ,CONSTRAINT PK_cca_user_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_cca_user_user_id UNIQUE (user_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.cca_user
ADD CONSTRAINT FK_cca_user_user_id FOREIGN KEY (user_id) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO

------------------- admin_user table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.admin_user (
  id INT IDENTITY
 ,user_id BIGINT NULL
 ,CONSTRAINT PK_admin_user_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_admin_user_user_id UNIQUE (user_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.admin_user
ADD CONSTRAINT FK_admin_user_user_id FOREIGN KEY (user_id) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO


------------------- competition_delegators table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.competition_delegator (
  id INT IDENTITY
 ,user_id BIGINT NOT NULL
 ,competition_instance_id INT NOT NULL
 ,CONSTRAINT PK_competition_delegators_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_competition_delegators UNIQUE (user_id, competition_instance_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.competition_delegator
ADD CONSTRAINT FK_competition_delegators_competition_instance_id FOREIGN KEY (competition_instance_id) REFERENCES dbo.competition_instance (id)
GO

ALTER TABLE [referee-management-tool].dbo.competition_delegator
ADD CONSTRAINT FK_competition_delegators_user_id FOREIGN KEY (user_id) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO

------------------- competition_approvers table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.competition_approver (
  id INT IDENTITY
 ,user_id BIGINT NOT NULL
 ,competition_instance_id INT NOT NULL
 ,CONSTRAINT PK_competition_approvers_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_competition_approvers UNIQUE (user_id, competition_instance_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.competition_approver
ADD CONSTRAINT FK_competition_approvers_competition_instance_id FOREIGN KEY (competition_instance_id) REFERENCES dbo.competition_instance (id)
GO

ALTER TABLE [referee-management-tool].dbo.competition_approver
ADD CONSTRAINT FK_competition_approvers_user_id FOREIGN KEY (user_id) REFERENCES dbo.[USER] (id) ON DELETE CASCADE ON UPDATE CASCADE
GO


------------------- unavailability_period table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.unavailability_period (
  id INT IDENTITY
 ,referee_id INT NOT NULL
 ,reason NVARCHAR(50) NOT NULL
 ,start_date DATE NOT NULL
 ,end_date DATE NOT NULL
 ,CONSTRAINT PK_unavailability_period_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_unavailability_period UNIQUE (referee_id, start_date, end_date)
)
GO

ALTER TABLE [referee-management-tool].dbo.unavailability_period
ADD CONSTRAINT FK_unavailability_period_referee_id FOREIGN KEY (referee_id) REFERENCES dbo.referee (id) ON DELETE CASCADE ON UPDATE CASCADE
GO

------------------- competition_eligible_referee table ----------------------------------------
CREATE TABLE [referee-management-tool].dbo.competition_eligible_referee (
  id INT IDENTITY
 ,referee_id INT NOT NULL
 ,competition_instance_id INT NOT NULL
 ,CONSTRAINT PK_competition_eligible_referee_id PRIMARY KEY CLUSTERED (id)
 ,CONSTRAINT KEY_competition_eligible_referee UNIQUE (referee_id, competition_instance_id)
)
GO

ALTER TABLE [referee-management-tool].dbo.competition_eligible_referee
ADD CONSTRAINT FK_competition_eligible_referee_competition_instance_id FOREIGN KEY (competition_instance_id) REFERENCES dbo.competition_instance (id)
GO

ALTER TABLE [referee-management-tool].dbo.competition_eligible_referee
ADD CONSTRAINT FK_competition_eligible_referee_referee_id FOREIGN KEY (referee_id) REFERENCES dbo.referee (id)
GO