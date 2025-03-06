const express = require("express");
const Question = require("../models/Question");

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const { category, question, options, correct_answer } = req.body;
    const newQuestion = new Question({ category, question, options, correct_answer });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add question" });
  }
});
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category });

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Update a question
router.put("/:id", async (req, res) => {
  try {
    const { question, options, correct_answer } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, options, correct_answer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to update question" });
  }
});

module.exports = router;
