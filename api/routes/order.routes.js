module.exports = (app) => {
    const orders = require("../controllers/order.controller.js");
    var router = require("express").Router();
  
    router.post("/orders/", orders.create);
    router.get("/orders/customer/:customerId", orders.findAll);
    router.put("/orders/:orderId", orders.update);
    router.delete("/orders/:orderId", orders.delete);
  
    app.use("/api", router);
  };
  