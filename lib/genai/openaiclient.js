const { AbstractClient } = require('./abstractclient');
const OpenAI = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

class OpenAIClient extends AbstractClient {
  constructor() {
    super();
    this.client = new OpenAI({
      apiKey: OPENAI_API_KEY
    });;
  }

  async getChatCompletions(messages) {
    const response = await this.client.chat.completions.create({
      model: OPENAI_MODEL,
      messages,
    });
    return response.choices[0]?.message?.content;
  }
}

module.exports = { OpenAIClient };