const db = require("../models");
const Order = db.orders;
const Customer = db.customers;
const Item = db.items;

// Fetch related customer and item details
const fetchDetails = async (customerId, itemId) => {
  const customer = await Customer.findOne({
    where: { customer_id: customerId },
    attributes: ["customer_name"],
  });

  const item = await Item.findOne({
    where: { item_id: itemId },
    attributes: ["item_name"],
  });

  return {
    customer_name: customer ? customer.customer_name : null,
    item_name: item ? item.item_name : null,
  };
};

// Create a new Order
exports.create = async (req, res) => {
  try {
    // Validate request
    const { order_date, customer_id, item_id } = req.body;
    if (!order_date || !customer_id || !item_id) {
      return res.status(400).send({
        message: "Order date, customer_id, and item_id are required!",
      });
    }

    // Create and save the order
    const newOrder = await Order.create({
      order_date,
      customer_id,
      item_id,
    });

    // Fetch related customer and item details
    const details = await fetchDetails(customer_id, item_id);

    // Format the response
    const formattedOrder = {
      order_id: newOrder.order_id,
      order_date: newOrder.order_date,
      customer_id: newOrder.customer_id,
      item_id: newOrder.item_id,
      ...details,
    };

    res.status(201).send(formattedOrder);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Order.",
    });
  }
};

// Retrieve all Orders
exports.findAll = async (req, res) => {
  try {
    const customerId = parseInt(req.params.customerId, 10);

    const orders = await Order.findAll({
      where: { customer_id: customerId },
      include: [
        { model: Customer, attributes: ["customer_name"] },
        { model: Item, attributes: ["item_name"] },
      ],
    });

    const formattedOrders = orders.map((order) => ({
      order_id: order.order_id,
      order_date: order.order_date,
      customer_id: order.customer_id,
      item_id: order.item_id,
      customer_name: order.customer ? order.customer.customer_name : null,
      item_name: order.item ? order.item.item_name : null,
    }));

    res.send(formattedOrders);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders.",
    });
  }
};

// Update an Order by ID
exports.update = async (req, res) => {
  try {
    const id = req.params.orderId;

    const [updated] = await Order.update(req.body, {
      where: { order_id: id },
    });

    if (updated === 1) {
      res.send({ message: "Order was updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Order with id=${id}`,
    });
  }
};

// Delete an Order by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.orderId;

    const deleted = await Order.destroy({
      where: { order_id: id },
    });

    if (deleted === 1) {
      res.send({ message: "Order was deleted successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Order with id=${id}`,
    });
  }
};
