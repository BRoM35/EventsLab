module.exports = (sequelize, type) => {
  return sequelize.define('participants', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: type.STRING,
    role: type.STRING,
  })
}
