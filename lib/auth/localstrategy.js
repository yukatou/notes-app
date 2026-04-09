class LocalStrategy {
  constructor(signin, serialize, deserialize) {
    this.signin = signin;
    this.serialize = serialize;
    this.deserialize = deserialize;
  }

  async signin(username, password) {
    return await this.signin(username, password);;
  }

  async serialize(user) {
    return await this.serialize(user);;
  }

  async deserialize(user) {
    return await this.deserialize(user);;
  }
}

module.exports = { LocalStrategy };