const { AbstractClient } = require('./abstractclient');

class DummyClient extends AbstractClient {
  constructor() {
    super();
  }

  async getChatCompletions(messages) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const response = "This is a dummy response from the DummyClient.";
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }
}

module.exports = { DummyClient };