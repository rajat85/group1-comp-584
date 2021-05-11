'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'users'
  });

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Role, {
      through: "user_roles",
      foreignKey: "user_id",
      otherKey: "role_id"
    });
  };

  return User;
};