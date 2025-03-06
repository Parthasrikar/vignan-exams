const express = require("express");
const Exam = require("../models/Exam");

const router = express.Router();

router.post("/start", async (req, res) => {
  try {
    const { category } = req.body;

    await Exam.updateMany({}, { $set: { examLive: false } });

    await Exam.findOneAndUpdate({ category }, { examLive: true }, { upsert: true });

    res.status(200).json({ message: `Exam for ${category} is now live` });
  } catch (error) {
    res.status(500).json({ error: "Failed to start exam" });
  }
});

router.get("/status", async (req, res) => {
  try {
    const liveExam = await Exam.findOne({ examLive: true });
    res.status(200).json({ liveExam });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exam status" });
  }
});

router.post("/stop-exam", async (req, res) => {
  try {
    await Exam.updateMany({}, { examLive: false });
    res.json({ message: "Exam has been stopped successfully" });
  } catch (error) {
    console.error("Error stopping exam:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
