const { AbstractClient } = require('./abstractclient');
const { AzureOpenAI } = require('openai');

const AOAI_API_KEY = process.env.AOAI_API_KEY;
const AOAI_ENDPOINT = process.env.AOAI_ENDPOINT;
const AOAI_DEPLOYMENT = process.env.AOAI_DEPLOYMENT || 'gpt-4o-mini';
const AOAI_MODEL = process.env.AOAI_MODEL || 'gpt-4o-mini';
const AOAI_API_VERSION = process.env.AOAI_API_VERSION || '2024-04-01-preview';

class AzureOpenAIClient extends AbstractClient {
  constructor() {
    super();
    this.client = new AzureOpenAI({
      apiKey: AOAI_API_KEY,
      endpoint: AOAI_ENDPOINT,
      deployment: AOAI_DEPLOYMENT,
      apiVersion: AOAI_API_VERSION,
    });
  }

  async getChatCompletions(messages) {
    const response = await this.client.chat.completions.create({
      model: AOAI_MODEL,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content;
  }
}

module.exports = { AzureOpenAIClient };