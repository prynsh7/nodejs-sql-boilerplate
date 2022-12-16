const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DEFAULT_DB, dbConfig.USER, dbConfig.PASS, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,
    pool: {
        max: 8,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.data = require("./data.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.employee = require("./employee.model")(sequelize, Sequelize);


module.exports = db;
