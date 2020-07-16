const express = require("express");
const router = express.Router();
const POS_Machine = require("./models/pos_machine_schema");
const jwt = require("./jwt");
router.get("/pos_machine", jwt.verify, async (req, res) => {
  try {
    let data = await POS_Machine.find({}).sort({ created: -1 });
    res.json({
      result: "success",
      message: "Fetch POS data Successfully",
      data: data,
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/pos_machine/:id", async (req, res) => {
  try {
    let data = await POS_Machine.findById({ _id: req.params.id });
    res.json({
      result: "success",
      message: "Fetch Single POS data Successfully",
      data: data,
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.post("/pos_machine", async (req, res) => {
  try {
    let doc = await POS_Machine.create(req.body);

    res.json({
      result: "success",
      message: "Create new POS data Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.errmsg });
  }
});
router.put("/pos_machine", async (req, res) => {
  try {
    let doc = await POS_Machine.findByIdAndUpdate(
      { _id: req.body._id },
      req.body
    );

    res.json({
      result: "success",
      message: "Update POS data Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.delete("/pos_machine/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await POS_Machine.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: "success",
      message: "Delete POS data Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
module.exports = router;
