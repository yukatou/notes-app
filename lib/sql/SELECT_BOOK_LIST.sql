SELECT
  "BookID",
  "UserID",
  "Title",
  "CreatedAt",
  "UpdatedAt"
FROM
  Books
WHERE
  "UserID" = :userId
;
