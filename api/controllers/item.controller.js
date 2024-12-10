const db = require("../models");
const Item = db.items;

// Create a new item
exports.create = (req, res) => {
  const { item_name, item_price } = req.body;

  if (!item_name || !item_price) {
    return res.status(400).send({
      message: "Item name and price are required!",
    });
  }

  Item.create({
    item_name,
    item_price,
  })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the item.",
      });
    });
};

// Get all items
exports.findAll = (req, res) => {
  Item.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Update an item by the ID
exports.update = (req, res) => {
  const id = req.params.itemId;

  Item.update(req.body, { where: { item_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Item with id=${id}. Item not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Item with id=${id}.`,
      });
    });
};

// Delete item
exports.delete = (req, res) => {
  const id = req.params.itemId;

  Item.destroy({ where: { item_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}. Item not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete Item with id=${id}.`,
      });
    });
};
