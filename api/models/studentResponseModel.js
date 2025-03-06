const mongoose = require('mongoose');

const studentResponseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  answers: [
    {
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true,
      },
      selected_option: {
        type: String,
        required: true,
      },
    },
  ],
  submitted_at: {
    type: Date,
    default: Date.now,
  },
});

const StudentResponse = mongoose.model("studentResponses", studentResponseSchema);

module.exports = StudentResponse;
