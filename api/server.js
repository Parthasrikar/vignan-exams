const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
const questionRoutes = require("./routes/questionRoutes");
const examRoutes = require("./routes/examRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/questions/", questionRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/students", studentRoutes);

app.get("/test", (req, res)=> {
    res.json("working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
