const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  category: String,
  examLive: { type: Boolean, default: false },
});

module.exports = mongoose.model("Exam", examSchema);
