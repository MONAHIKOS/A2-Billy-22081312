module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_name: {
        type: Sequelize.STRING,
      },
      customer_email: {
        type: Sequelize.STRING,
      },
    });
  
    return Customer;
  };
  