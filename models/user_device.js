module.exports = (sequelize, DataTypes) => {
  const user_device = sequelize.define('user_device', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        foreignKey: true,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        references: {
          model: 'devices',
          key: 'id'
        }
      }
    },
    {
      timestamps: false,
      underscored: true,
      indexes: [{
        unique: true,
        name: 'fk_user_device_device1_idx',
        fields: ['device_id']
      }]
    });

  user_device.associate = function (models) {
    user_device.belongsTo(models.device);
  };

  return user_device;
};

