const express = require("express");
const router = express.Router();
const branch = require("./models/branch_schema");
const posmachine = require("./models/pos_machine_schema")
const jwt = require("./jwt");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
router.get("/branch", async (req, res) => {
  try {
    await branch.find({}).populate('pos_machines').exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          result: "success",
          message: "Fetch Branch Successfully",
          data: data,
        });
      }
    });


  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/branch/:id", async (req, res) => {
  try {
    await branch.findById({ _id: req.params.id })
      .populate('pos_machines').exec(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            result: "success",
            message: "Fetch Single Branch Successfully",
            data: data,
          });
        }
      });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/branch_getpos", async (req, res) => {
  try {
    let data = await posmachine.find({}).select({ "alias": 1, "_id": 1 }).sort({ created: -1 });
    res.json({
      result: "success",
      message: "Fetch Single Branch Successfully",
      data: data,
    });
  } catch (err) {
    console.log(err)
    res.json({ result: "error", message: err.msg });
  }
});

router.post("/branch", async (req, res) => {
  // console.log(req)
  try {
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {

      let newBranch = await branch.create({ name: fields.name, tel: fields.tel, address: fields.address });
      await uploadImage(files, newBranch);

      let pos_arr = fields.pos_machines.split(',')
      const pos = await posmachine.find().where('_id').in(pos_arr).exec();
      newBranch.pos_machines = pos
      await newBranch.save()
      res.json({ result: "success", message: "Create Brach data successfully" });
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});


uploadImage = async (files, doc) => {
  if (files.frontimage != null) {
    var fileExtention = files.frontimage.name.split(".").pop();
    doc.frontimage = `${Date.now()}+${doc.name}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "/uploaded/images/branch/frontimage") + "/" + doc.frontimage;

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.frontimage.path, newpath);

    // Update database
    await branch.findOneAndUpdate({ _id: doc.id }, doc);
  }
};
router.put("/branch", async (req, res) => {

  try {
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      let updateBranch = await branch.findByIdAndUpdate({ _id: fields.id }, { name: fields.name, tel: fields.tel, address: fields.address });
      let pos_arr = fields.pos_machines.split(',')
      const pos = await posmachine.find().where('_id').in(pos_arr).exec();
      updateBranch.pos_machines = pos
      await updateBranch.save()
      await uploadImage(files, updateBranch);
      res.json({ result: "success", message: "Update Brach data successfully" });
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.delete("/branch/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await branch.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: "success",
      message: "Delete Branch Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
module.exports = router;
