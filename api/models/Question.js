const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  options: [String],
  correct_answer: String,
});

module.exports = mongoose.model("Question", questionSchema);
