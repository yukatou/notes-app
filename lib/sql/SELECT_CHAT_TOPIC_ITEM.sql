SELECT
  "TopicID",
  "UserID",
  "Title",
  "CreatedAt"
FROM
  ChatTopics
WHERE
  "UserID" = :userId
  AND
  "TopicID" = :topicId
;
