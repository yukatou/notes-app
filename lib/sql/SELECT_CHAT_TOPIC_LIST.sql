SELECT
  "TopicID",
  "Title",
  "CreatedAt"
FROM
  ChatTopics
WHERE
  "UserID" = :userId
;
