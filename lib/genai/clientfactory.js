

class ClientFactory {
  constructor() {
  }

  create() {
    if (this.isAzureOpenAI()) {
      const { AzureOpenAIClient } = require('./aoaiclient');
      return new AzureOpenAIClient();
    } else if (this.isOpenAI()) {
      const { OpenAIClient } = require('./openaiclient');
      return new OpenAIClient();
    } else {
      const { DummyClient } = require('./dummyclient');
      return new DummyClient();
    }
  }

  isAzureOpenAI() {
    return (
      !!process.env.AOAI_API_KEY &&
      !!process.env.AOAI_ENDPOINT
    );
  }

  isOpenAI() {
    return (
      !!process.env.OPENAI_API_KEY
    );
  }
}

module.exports = { ClientFactory };