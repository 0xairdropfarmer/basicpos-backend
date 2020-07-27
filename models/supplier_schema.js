const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name: String,
    address: String,
    tel: String,
    email: String,
    vat: Number,
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("supplier", schema);
