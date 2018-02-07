module.exports = (sequelize, DataTypes) => {
  const device_boat = sequelize.define('device_boat', {
    boat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'boats',
        key: 'id'
      }
    },
    device_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'devices',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    underscored: true,
    indexes: [{
      unique: true,
      name: 'fk_device_boat_device1_idx',
      fields: ['device_id']
    }]
  });

  device_boat.associate = function (models) {
    device_boat.belongsTo(models.device);
    device_boat.belongsTo(models.boat)
  };

  return device_boat;
};