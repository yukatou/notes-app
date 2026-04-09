SELECT
  "BookID",
  "NoteID",
  "Title",
  "Content",
  "CreatedAt",
  "UpdatedAt"
FROM
  Notes
WHERE
  "NoteID" = :noteId
;
