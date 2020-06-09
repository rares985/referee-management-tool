-- Beautiful show competition instances per season
CREATE VIEW BeautifulShowCompetitionInstances
AS
SELECT
    CSL.ID as 'ID',
    C.Name as 'Nume competitie',
    S.Name as 'Sex',
    TL.Name as 'Nivel profesional',
    CONCAT(YEAR(Ssn.StartDate), '-', YEAR(Ssn.EndDate)) as 'Sezon'
FROM [dbo].[CompetitionInstance] CI
INNER JOIN [dbo].[CompetitionSexLevel] CSL
    ON CI.CompetitionSexLevelID = CSL.ID
INNER JOIN [dbo].[Season] Ssn
    ON CI.SeasonID = Ssn.ID
INNER JOIN [dbo].[CompetitionSex] CS
    ON CSL.CompetitionSexID = CS.ID
INNER JOIN [dbo].[Competition] C
    ON CS.CompetitionID = C.ID
INNER JOIN [dbo].[Sex] S
    ON CS.SexID = S.ID
INNER JOIN [dbo].[TeamLevel] TL
    ON CSL.TeamLevelID = TL.ID;