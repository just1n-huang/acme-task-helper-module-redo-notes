const Sequelize = require("sequelize");

const { VIRTUAL, UUID, UUIDV4, STRING, BOOLEAN } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

const Task = conn.define("task", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  complete: {
    type: BOOLEAN,
    defaultValue: false,
  },
  pending: {
    type: VIRTUAL,
    get: function () {
      return !this.complete;
    },
  },
});

module.exports = {
  conn,
  Task,
};
