'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    user_id: DataTypes.INTEGER,
    park_code: DataTypes.STRING,
    camp_ground_id: DataTypes.STRING,
    users_count: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, { tableName: 'bookings' });

  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  
  return Booking;
};