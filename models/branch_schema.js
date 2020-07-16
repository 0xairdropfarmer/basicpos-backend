const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name: String,
    address: String,
    tel: String,
    frontimage: String,
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("branch", schema);
