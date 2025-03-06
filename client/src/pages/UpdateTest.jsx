/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateTest = () => {
  const [categories] = useState(["Coding", "Math", "Behavioral", "Aptitude"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const fetchQuestionsByCategory = async (category) => {
    console.log("Fetching questions");
    
    try {
      const response = await axios.get(`http://localhost:3000/api/questions/category/${category}`);
      console.log("Fetched Questions:", response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error.response?.data || error);
      setQuestions([]); // Ensure empty state if error occurs
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchQuestionsByCategory(category);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleUpdate = async (id, index) => {
    try {
      await axios.put(`http://localhost:3000/api/questions/${id}`, questions[index]);
      alert("Question updated successfully!");
      setEditIndex(null);
      fetchQuestionsByCategory(selectedCategory); // Refresh questions
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Questions</h2>

      <label className="block font-semibold mb-2">Select Category:</label>
      <select
        onChange={handleCategoryChange}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Select a Category --</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {questions.length === 0 ? (
        <p>No questions found for {selectedCategory}</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q._id} className="border p-4 rounded-lg shadow-md bg-white">
              {editIndex === index ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={q.question}
                    onChange={(e) => handleChange(index, "question", e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={q.options.join(", ")}
                    onChange={(e) =>
                      handleChange(index, "options", e.target.value.split(","))
                    }
                  />
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={q.correct_answer}
                    onChange={(e) => handleChange(index, "correct_answer", e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdate(q._id, index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">Question: {q.question}</p>
                  <p>Options: {q.options.join(", ")}</p>
                  <p>Correct Answer: {q.correct_answer}</p>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateTest;
