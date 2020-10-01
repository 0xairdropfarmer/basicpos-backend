const express = require("express");
const router = express.Router();
const Order = require("./models/order_schema.js");
const jwt = require("./jwt");
router.post("/order", async (req, res) => {
  try {
    let newOrder = await Order.create(req.body);

    res.json({
      result: "success",
      message: "Create Brach data successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err });
  }
});

router.post("/order", jwt.verify, async (req, res) => {
  try {
    req.body.staff_id = req.userId;
    let doc = await Order.create(req.body);
    res.json({ result: "ok", message: doc });
  } catch (error) {
    res.json({ result: "nok", message: error });
  }
});

module.exports = router;
