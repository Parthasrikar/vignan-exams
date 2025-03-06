import { useState } from "react";
import axios from "axios";

const CreateTest = () => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/questions/add", {
        category,
        question,
        options,
        correct_answer: correctAnswer,
      });
      alert("Question added successfully!");
      setCategory("");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } catch (error) {
      alert("Error adding question");
      console.log(error);   
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Create Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Category:</label>
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Coding">Coding</option>
            <option value="Math">Math</option>
            <option value="Behavioral">Behavioral Aptitude</option>
            <option value="Aptitude">Aptitude</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Question:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Options:</label>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>

        <div>
          <label className="block font-semibold">Correct Answer:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
