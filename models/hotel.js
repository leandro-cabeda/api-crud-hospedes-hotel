module.exports = app => {
    const { Connect, Sequelize } = app.database.database;
    const { Guest } = app.models.guest;
  
    
    const Hotel = Connect.define('Hotels', {
      numberBedroom: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      amount: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      value: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dateIn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      dateOut: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      additionalVehicle: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
    
    Hotel.hasMany(Guest);

    Guest.belongsTo(Hotel);

    Hotel.sync({force: false});
   
    return { Hotel, Op:Sequelize.Op };
  };
  