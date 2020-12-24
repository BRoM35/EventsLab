module.exports = (sequelize, type) => {
  return sequelize.define('event', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    startDate: type.STRING,
    endDate: type.STRING,
    statusEvent: {
      type: type.STRING,
      defaultValue: 'active',
    },
  })
}
