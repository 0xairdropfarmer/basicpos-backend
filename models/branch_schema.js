const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name: String,
    address: String,
    tel: String,
    frontimage: String,
    pos_machines: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'pos_machines' }
    ],
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("branch", schema);
