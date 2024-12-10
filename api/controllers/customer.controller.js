const db = require("../models");
const Customer = db.customers;

// Create Customer
exports.create = (req, res) => {

  if (!req.body.customer_name || !req.body.customer_email) {
    return res.status(400).send({
      message: "Neither customer name and email may be empty!",
    });
  }

  const customer = {
    customer_name: req.body.customer_name,
    customer_email: req.body.customer_email,
  };

  Customer.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all Customers
exports.findAll = (req, res) => {
  Customer.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Update a Customer
exports.update = (req, res) => {
  const id = req.params.customerId;

  Customer.update(req.body, {
    where: { customer_id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

// Delete a Customer
exports.delete = (req, res) => {
  const id = req.params.customerId;

  Customer.destroy({
    where: { customer_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};
