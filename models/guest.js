module.exports = app => {
  const { Connect, Sequelize } = app.database.database;

  const Guest = Connect.define('Guests', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    document: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Guest.sync({ force: false });

  return { Guest, Op: Sequelize.Op };
};
