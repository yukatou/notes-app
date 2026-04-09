UPDATE Notes
SET
  "BookID" = :bookId,
  "Title" = :title,
  "Content" = :content,
  "UpdatedAt" = CURRENT_TIMESTAMP
WHERE
  "NoteID" = :noteId
;
