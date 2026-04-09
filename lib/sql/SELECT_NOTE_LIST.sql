SELECT
  Notes."BookID",
  Notes."NoteID",
  Books."Title" AS "BookTitle",
  Notes."Title" AS "NoteTitle",
  Notes."CreatedAt",
  Notes."UpdatedAt"
FROM
  (
    SELECT
      *
    FROM
      Notes
    WHERE
      Notes."BookID"
      IN
      (SELECT "BookID" FROM Books WHERE "UserID" = :userId)
  ) AS Notes
LEFT JOIN
  (SELECT * FROM Books WHERE "UserID" = :userId) AS Books
ON
  Notes."BookID" = Books."BookID"
ORDER BY
  Notes."CreatedAt" DESC
;
