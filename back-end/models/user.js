const { Sequelize, DataTypes } = require('sequelize');
let sequelize = new Sequelize(
    "test1",
    "postgres",
    "oyak",
    {
      host: "oyaappre7",
      dialect: "postgres",
    }
  );


const User = sequelize.define('User', {
  // Model attributes are defined here
  role: {
    type: DataTypes.ENUM("admin", "standart"),
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
module.exports = User;
