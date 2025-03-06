import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentExam() {
  const [examLive, setExamLive] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [results, setResults] = useState([]);
  useEffect(() => {
    // Check if exam is live
    axios.get("http://localhost:3000/api/students/exam-status").then((res) => {
      if (res.data.exam_live) {
        setExamLive(true);
        setCategory(res.data.category);
        fetchQuestions(res.data.category);
      } else {
        alert("No exam is live right now.");
      }
    });
  }, []);

  const fetchQuestions = (category) => {
    axios
      .get(`http://localhost:3000/api/students/questions?category=${category}`)
      .then((res) => {
        if (res.data.length > 0) {
          setQuestions(res.data);
          console.log(res.data);
        }
      });
  };

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    console.log(`Selected ${option} for question ${questionId}`); // Debugging log
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      question_id: questionId,
      selected_option: answers[questionId],
    }));
  
    if (formattedAnswers.length === 0) {
      alert("You must select at least one answer before submitting.");
      return;
    }
  
    axios
      .post("http://localhost:3000/api/students/submit-answers", {
        category,
        answers: formattedAnswers,
      })
      .then((res) => {
        console.log("🔹 Server Response:", res.data); // ✅ Check if score & total are coming
        setScore(res.data.score);
        setTotal(res.data.total);
        setResults(res.data.results);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("❌ Error submitting test:", error.response?.data || error);
      });
  };
  
  

  if (!examLive)
    return <p className="text-center text-red-500">Exam not live</p>;
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Test Results</h1>
        <p className="text-center text-green-500 text-lg font-semibold">
          Score: {score}/{total}
        </p>
        <div className="mt-4">
          {(results || []).map((result, index) => (
            <div key={index} className="mb-2 p-4 border rounded-lg">
              <p className="font-semibold">Question {index + 1 + " :   " + result.question}</p>
              <p>Your Answer: {result.selected_option}</p>
              <p
                className={result.isCorrect ? "text-green-500" : "text-red-500"}
              >
                {result.isCorrect
                  ? "Correct"
                  : `Correct Answer: ${result.correct_answer}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Exam - {category}</h1>
      {questions.map((q) => (
        <div key={q._id} className="mb-4 p-4 border rounded-lg">
          <p className="font-semibold">{q.question}</p>
          <div className="flex flex-col mt-2">
            {q.options.map((optionKey, idx) => (
              <label key={optionKey} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={q._id}
                  value={q.options[idx]} // ✅ Correct: Use the actual option text
                  checked={answers[q._id] === q.options[idx]}
                  onChange={() => handleSelect(q._id, q.options[idx])}
                />

                {q.options[idx]}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg"
        onClick={handleSubmit}
      >
        Submit Test
      </button>
    </div>
  );
}
