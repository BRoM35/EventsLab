module.exports = (sequelize, type) => {
  return sequelize.define('document', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    forWhom: type.STRING,
    content: type.STRING,
    statusDocument: {
      type: type.STRING,
      defaultValue: 'active',
    },
    status: {
      type: type.STRING,
      defaultValue: 'not signed',
    }
  })
}
