const { ClientFactory } = require('./clientfactory');

// Set chat role
const ROLE = {
  SYSTEM: "system",
  ASSISTANT: "assistant",
  USER: "user",
};

class GenAIClient {
  constructor() {
    const clientfactory = new ClientFactory();
    this._client = clientfactory.create();
  }

  async getChatCompletions(messages) {
    return await this._client.getChatCompletions(messages);
  }
}

module.exports = { GenAIClient, ROLE };