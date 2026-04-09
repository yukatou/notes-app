const { v7: uuid } = require('uuid');
const { MySqlClient } = require('../lib/postgresclient');
const { sql: SQL } = require('../lib/query');

class Chats {
  _client = null;

  constructor() {
    this._client = new MySqlClient();
  }

  async getTopicList(uesrId) {
    return await this._client.executeQuery(
      SQL['SELECT_CHAT_TOPIC_LIST'],
      { uesrId }
    );
  }

  async getTopicItem(userId, topicId) {
    return await this._client.executeQuery(
      SQL['SELECT_CHAT_TOPIC_ITEM'],
      { userId, topicId }
    );
  }

  async addTopicItem(userId, title) {
    var topicId = uuid();

    await this._client.executeQuery(
      SQL['INSERT_CHAT_TOPIC_ITEM'],
      { userId, topicId, title }
    );

    return {
      TopicID: topicId,
      UserID: userId,
      Title: title
    };
  }

  async getHistory(userId, topicId) {
    return await this._client.executeQuery(
      SQL['SELECT_CHAT_HISTORY'],
      { userId, topicId }
    );
  }

  async addHistory(userId, topicId, role, message) {
    await this._client.executeQuery(
      SQL['INSERT_CHAT_HISTORY'],
      { userId, topicId, role, message }
    );

    return {
      UserID: userId,
      TopicID: topicId,
      Role: role,
      Message: message
    };
  }
}

module.exports = { Chats };