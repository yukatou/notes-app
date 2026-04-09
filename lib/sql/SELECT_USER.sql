SELECT
  "UserID",
  "Username",
  "Password",
  "Email",
  "CreatedAt"
FROM
  Users
WHERE
  "Email" = :email
;
