const db = require("../models");
const Companies = db.companies;
const Op = db.Sequelize.Op;

// Create company
exports.create = (req, res) => {
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contactId: parseInt(req.params.contactId),
    };

    Companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the company.",
            });
        });
};

// Get all companies for a specific contact
exports.findAll = (req, res) => {
    Companies.findAll({
        where: {
            contactId: parseInt(req.params.contactId),
        },
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving companies.",
            });
        });
};

// Get one company by id for a specific contact
exports.findOne = (req, res) => {
    Companies.findOne({
        where: {
            contactId: req.params.contactId,
            company_id: req.params.companyId,
        },
    })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Company with id=${req.params.companyId} not found.`,
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the company.",
            });
        });
};

// Update one company by id
exports.update = (req, res) => {
    const id = req.params.companyId;

    Companies.update(req.body, {
        where: { company_id: id, contactId: req.params.contactId },
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update company with id=${id}. Maybe company was not found or req.body is empty.`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating company with id=" + id,
            });
        });
};

// Delete one company by id
exports.delete = (req, res) => {
    const id = req.params.companyId;

    Companies.destroy({
        where: { company_id: id, contactId: req.params.contactId },
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete company with id=${id}. Maybe company was not found.`,
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete company with id=" + id,
            });
        });
};
