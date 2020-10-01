const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderSchma = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    total: Number,
    paid: Number,
    change: Number,
    order_list: String,
    payment_type: String,
    payment_detail: String,
    staff_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: String,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

OrderSchma.plugin(AutoIncrement, { inc_field: "order_id" });
module.exports = mongoose.model("order", OrderSchma);
