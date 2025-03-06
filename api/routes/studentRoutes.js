const express = require("express");
const StudentResponse = require("../models/studentResponseModel");
const Question = require("../models/Question");
const ExamStatus = require("../models/Exam");

const router = express.Router();

// 🟢 1️⃣ Check if Exam is Live
router.get("/exam-status", async (req, res) => {
  try {
    console.log("Checking exam status...");
    const exam = await ExamStatus.findOne({ examLive: true });

    if (!exam || !exam.examLive) {
      console.log("Exam is NOT live.");
      return res.json({ exam_live: false });
    }

    console.log("Exam is live for category:", exam.category);
    res.json({ exam_live: true, category: exam.category });
  } catch (error) {
    console.error("Error checking exam status:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 2️⃣ Fetch Questions if Exam is Live
router.get("/questions", async (req, res) => {
  try {
    const exam = await ExamStatus.findOne({ examLive: true });
    
    if (!exam) {
      return res.json({ message: "Exam not live" });
    }

    const questions = await Question.find({ category: exam.category }).select("-correct_answer");
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 3️⃣ Submit Student Answers
router.post("/submit-answers", async (req, res) => {
  try {
    const { category, answers } = req.body;

    if (!category || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    let score = 0;
    const total = answers.length;
    const results = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.question_id);

      if (!question) {
        console.log(`Question not found for ID: ${ans.question_id}`);
        continue;
      }

      const isCorrect = question.correct_answer === ans.selected_option;
      if (isCorrect) score++;

      results.push({
        question: question.question,
        selected_option: ans.selected_option,
        correct_answer: question.correct_answer,
        isCorrect,
      });
    }

    // Save the student's response
    const studentResponse = new StudentResponse({ category, answers });
    await studentResponse.save();

    // ✅ Return the correct response
    res.json({
      message: "Answers submitted successfully",
      score,
      total,
      results,
    });

  } catch (error) {
    console.error("Error in /submit-answers:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
