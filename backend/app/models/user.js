module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: type.STRING,
    lastName: type.STRING,
    country: type.STRING,
    city: {
      type: type.STRING,
      defaultValue: '',
    },
    about: {
      type: type.STRING,
      defaultValue: '',
    },
    email: type.STRING,
    password: type.STRING,
    pin: {
      type: type.STRING,
      defaultValue: '',
    },
    file: type.STRING,
    status: {
      type: type.STRING,
      defaultValue: 'not confirmed',
    },
    statusAccount: {
      type: type.STRING,
      defaultValue: 'active',
    },
  })
}
