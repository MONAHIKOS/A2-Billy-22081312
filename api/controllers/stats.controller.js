const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Companies = db.companies;
const Op = db.Sequelize.Op;

exports.calculate = (req, res) => {
    Contacts.count().then(totalContacts => {
        Phones.count().then(totalPhones => {
            Companies.count().then(totalCompanies => { 
                Contacts.max('updatedAt').then(lastUpdatedContact => {
                    Contacts.min('createdAt').then(oldestContact => {
                        res.send({
                            totalContacts: totalContacts,
                            totalPhones: totalPhones,
                            totalCompanies: totalCompanies, 
                            lastUpdatedContact: lastUpdatedContact,
                            oldestContact: oldestContact
                        });
                    });
                });
            });
        });
    });
};
