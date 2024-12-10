module.exports = app => {
    const items = require("../controllers/item.controller.js");
    var router = require("express").Router();
  
    router.post("/items", items.create);
    router.get("/items", items.findAll);
    router.put("/items/:itemId", items.update);
    router.delete("/items/:itemId", items.delete);
  
    app.use('/api', router);
};