const { childMethods } = require("../database/childDB");
class child {
  constructor() {
    this.db = new childMethods;
  }
  getById = (id) => {
    return this.db.get(id);
  };
  getAllDoctorRelated = (id) => {
    return this.db.getAllDoctorRelated(id);
  }
  getAllWithoutDoctor = () => {
    return this.db.getAllWithoutDoctor();
  }
  add = (user) => {
    return this.db.add(user);
  };
  updateChild = (id, updatedInfo) => {
    return this.db.updateChild(id, updatedInfo);
  };
  delete = (id) => {
    return this.db.delete(id);
  }
}

module.exports = new child();