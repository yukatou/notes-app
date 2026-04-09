const SYSTEM_PROMPT = "You are a helpful assistant. You need to reply using Japanese, even if user send other languages like English.";

const { GenAIClient, ROLE } = require('../lib/genai/client');
const { Chats } = require('../models/chats');
const { v4: uuid } = require('uuid');

var history = {};

class ChatsController {
  constructor() {
    history = {};
  }

  async addNewTopic(userId) {
    var chats = new Chats();
    var topicId = uuid();
    var topicTitle = (new Date()).toISOString();

    await chats.addTopicItem(userId, topicId, topicTitle);

    return {
      TopicID: topicId,
      UserID: userId,
      Title: topicTitle
    };
  }

  async getHistoryList(userId) {
    var chats = new Chats();
    return await chats.getTopicList(userId);
  }

  async getHistoryItem(userId, topicId) {
    var chats = new Chats();
    return await chats.getHistory(userId, topicId) || [];
  }

  async addHistoryItem(userId, topicId, role, message) {
    var chats = new Chats();

    // Check whether exists topic.
    var topic = await chats.getTopicItem(userId, topicId);

    // If topic does not exist, create new topic.
    if (!topic) {
      topic = await chats.addTopicItem(userId, null, null);
      topicId = topic.TopicID;
    }

    // Add chat history to the topic.
    var history = await chats.addHistory(userId, topicId, role, message);

    return history;
  }

  async sendMessage(userId, topicId, message, options) {
    var chats = new Chats();
    var history;

    // Check whether exists topic, get chat history.
    if (!topicId) {
      // Create new topic.
      var topicTitle = (new Date()).toISOString();
      topicId = (await chats.addTopicItem(userId, topicTitle)).TopicID;

      // Add system prompt to the new topic.
      history = [
        await chats.addHistory(userId, topicId, ROLE.SYSTEM, SYSTEM_PROMPT)
      ];
    } else {
      // Get chat history
      history = await chats.getHistory(userId, topicId);
    }

    // Set request object
    var messages = history.map(item => {
      return {
        role: item.Role,
        content: item.Message
      };
    });
    if ((options?.noteIsAttached || '').toLowerCase() === 'true') {
      message += `\r\n\r\n`;
      message += `### NoteTitle: \r\n${options.noteTitle}\r\n`;
      message += `### NoteContent: \r\n${options.noteContent}\r\n`;
    }
    messages.push({ role: ROLE.USER, content: message });

    // Send request
    const client = new GenAIClient();
    const reply = await client.getChatCompletions(messages);

    // Add chat history
    await this.addHistoryItem(userId, topicId, ROLE.USER, message);
    await this.addHistoryItem(userId, topicId, ROLE.ASSISTANT, reply);

    return {
      topicId,
      message: reply
    };
  }
}

module.exports = { ChatsController };