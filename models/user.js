module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
      name: DataTypes.STRING
    },
    { timestamps: false });
  return user;
};
