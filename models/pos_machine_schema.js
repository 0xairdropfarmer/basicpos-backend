const mongoose = require("mongoose");
const schema = mongoose.Schema({
  alias: String,
  serial_number: String,
  email: String,
  branch: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }
  ],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("pos_machines", schema);
