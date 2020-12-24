const Sequelize = require('sequelize');
const UserModel = require('./app/models/user');
const EventModel = require('./app/models/event');
const DocModel = require('./app/models/document');
const PartModel = require('./app/models/participants');
const RoleModel = require('./app/models/role');
const config = require('./config/db');

const sequelize = new Sequelize(config.db, config.user, config.pass, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const User = UserModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Doc = DocModel(sequelize, Sequelize);
const Part = PartModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);

User.belongsTo(Role);
Part.belongsTo(User);
Part.belongsTo(Event, { as: 'partEvents', foreignKey: 'eventId', targetKey: 'id'});
Doc.belongsTo(Event);
Doc.belongsTo(User);

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Role,
  Event,
  Doc,
  Part
}
