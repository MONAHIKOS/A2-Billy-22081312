const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Companies = db.companies;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const { name, address } = req.body;

    // Backend validation: Ensure at least one field is provided
    if (!name?.trim() && !address?.trim()) {
        return res.status(400).send({
            message: "At least one of the fields (name or address) must be provided.",
        });
    }

    const contact = {
        name: name || null, // Default to null if not provided
        address: address || null,
    };

    Contacts.create(contact)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the contact.",
            });
        });
};


// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;

    Contacts.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Contact with id=" + id
            });
        }
    );
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;

    Contacts.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Contact`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Contact with id=" + id
        });
    });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = parseInt(req.params.contactId);

    Phones.destroy({
        where: { contactId: id }
    })
    .then(num => {
        Contacts.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Contact`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contact with id=" + id
            });
        });
    });
};