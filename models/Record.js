const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  isDeleted: {
  type: Boolean,
  default: false,
},
deletedAt: {
  type: Date,
  default: null,
}
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);