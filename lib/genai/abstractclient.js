class AbstractClient {
  constructor() {
    if (this.constructor === AbstractClient) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  async getChatCompletions(messages) {
    throw new Error("Method 'getChatCompletions()' must be implemented.");
  }
}

module.exports = { AbstractClient };