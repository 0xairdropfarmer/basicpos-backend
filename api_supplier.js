const express = require("express");
const router = express.Router();
const supplier = require("./models/supplier_schema");
const jwt = require("./jwt");
router.get("/supplier", jwt.verify, async (req, res) => {
  try {
    let data = await supplier.find({}).sort({ created: -1 });
    res.json({
      result: "success",
      message: "Fetch Supplier data Successfully",
      data: data,
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/supplier/:id", async (req, res) => {
  try {
    let data = await supplier.findById({ _id: req.params.id });
    res.json({
      result: "success",
      message: "Fetch Single Supplier data Successfully",
      data: data,
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.post("/supplier", async (req, res) => {
  try {

    let doc = await supplier.create(req.body);

    res.json({
      result: "success",
      message: "Create new Supplier data Successfully",
    });
  } catch (err) {
    console.log(err)
    res.json({ result: "error", message: err.msg });
  }
});
router.put("/supplier", async (req, res) => {
  try {
    let doc = await supplier.findByIdAndUpdate(
      { _id: req.body._id },
      req.body
    );

    res.json({
      result: "success",
      message: "Update Supplier data Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.delete("/supplier/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await supplier.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: "success",
      message: "Delete Supplier data Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
module.exports = router;
