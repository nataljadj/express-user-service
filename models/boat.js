module.exports = (sequelize, DataTypes) => {
  const boat = sequelize.define('boat', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    { timestamps: false });

  boat.associate = function (models) {
    boat.hasOne(models.device_boat, { foreignKey: 'boat_id' });
  };
  return boat;
};