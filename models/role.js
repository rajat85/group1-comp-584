'use strict';

const ROLES = [ "user", "admin", "moderator" ];

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, { tableName: 'roles' });

  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsToMany(models.User, {
      through: 'user_roles',
      foreignKey: 'role_id',
      otherKey: 'user_id'
    });
  };

  Role.prototype.ROLES = Role.ROLES = ROLES;

  return Role;
};