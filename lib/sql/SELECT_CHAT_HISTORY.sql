SELECT
  "ChatID",
  "Role",
  "Message",
  "CreatedAt"
FROM
  ChatHistory
WHERE
  "UserID" = :userId
  AND
  "TopicID" = :topicId
ORDER BY
  "ChatID" ASC
;
