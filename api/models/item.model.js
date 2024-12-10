module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
      item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_name: {
        type: Sequelize.STRING,
      },
      item_price: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Item;
  };
  