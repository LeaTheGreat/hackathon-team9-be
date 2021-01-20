const { childMethods } = require("../database/childDB");
class user {
  constructor() {
    this.db = new childMethods;
  }
  getById = (id) => {
    return this.db.get(id);
  };
  add = (user) => {
    return this.db.add(user);
  };
  updateChild = (id, updatedInfo) => {
    return this.db.updateChild(id, updatedInfo);
  };
}

module.exports = new child();