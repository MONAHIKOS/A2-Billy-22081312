module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      order_date: {
        type: Sequelize.DATE,
      },

      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "customers",
          key: "customer_id",
        },
      },

      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items",
          key: "item_id",
        },
      },
    });
  
    return Order;
  };
  