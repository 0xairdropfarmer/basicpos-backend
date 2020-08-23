const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name: String,
    cost: Number,
    price: Number,
    image: String,
    supplier: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'supplier' }
    ],
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("product", schema);
