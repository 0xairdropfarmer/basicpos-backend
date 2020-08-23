const express = require("express");
const router = express.Router();
const product = require("./models/product_schema");
const supplier = require("./models/supplier_schema")
const jwt = require("./jwt");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
router.get("/product", async (req, res) => {
  try {
    await product.find({}).populate('supplier').exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          result: "success",
          message: "Fetch product Successfully",
          data: data,
        });
      }
    });


  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/product/:id", async (req, res) => {
  try {
    await product.findById({ _id: req.params.id })
      .populate('supplier').exec(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            result: "success",
            message: "Fetch Single product Successfully",
            data: data,
          });
        }
      });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.get("/get_supplier", async (req, res) => {
  try {
    let data = await posmachine.find({}).select({ "alias": 1, "_id": 1 }).sort({ created: -1 });
    res.json({
      result: "success",
      message: "Fetch Single product Successfully",
      data: data,
    });
  } catch (err) {
    console.log(err)
    res.json({ result: "error", message: err.msg });
  }
});

router.post("/product", async (req, res) => {
  // console.log(req)
  try {
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {

      let newproduct = await product.create({ name: fields.name, tel: fields.tel, address: fields.address });
      await uploadImage(files, newproduct);

      let pos_arr = fields.supplier.split(',')
      const pos = await posmachine.find().where('_id').in(pos_arr).exec();
      newproduct.supplier = pos
      await newproduct.save()
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
      path.resolve(__dirname + "/uploaded/images/product/frontimage") + "/" + doc.frontimage;

    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.frontimage.path, newpath);

    // Update database
    await product.findOneAndUpdate({ _id: doc.id }, doc);
  }
};
router.put("/product", async (req, res) => {

  try {
    var form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      let updateproduct = await product.findByIdAndUpdate({ _id: fields.id }, { name: fields.name, tel: fields.tel, address: fields.address });
      let pos_arr = fields.supplier.split(',')
      const pos = await posmachine.find().where('_id').in(pos_arr).exec();
      updateproduct.supplier = pos
      await updateproduct.save()
      await uploadImage(files, updateproduct);
      res.json({ result: "success", message: "Update Brach data successfully" });
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
router.delete("/product/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let response = await product.findOneAndDelete({ _id: req.params.id });

    res.json({
      result: "success",
      message: "Delete product Successfully",
    });
  } catch (err) {
    res.json({ result: "error", message: err.msg });
  }
});
module.exports = router;
