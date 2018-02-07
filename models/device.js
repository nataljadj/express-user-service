module.exports = (sequelize, DataTypes) => {
  const device = sequelize.define('device', {
      device_id: {
        type: DataTypes.UUID,
        unique: true
      }
    },
    { timestamps: false });

  device.associate = function (models) {
    device.hasOne(models.user_device, { foreignKey: 'device_id' });
    device.hasOne(models.device_boat, { foreignKey: 'device_id' });
  };
  
  return device;
};