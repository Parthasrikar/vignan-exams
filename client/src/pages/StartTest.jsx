import { useState } from "react";
import axios from "axios";

const StartTest = () => {
  const [category, setCategory] = useState("");

  // 🟢 Start Exam
  const handleStart = async () => {
    try {
      await axios.post("http://localhost:3000/api/exam/start", { category });
      alert(`Exam for ${category} is now live!`);
    } catch (error) {
      alert("Error starting exam");
      console.error(error);
    }
  };

  // 🔴 Stop Exam
  const handleStop = async () => {
    try {
      await axios.post("http://localhost:3000/api/exam/stop-exam");
      alert("All exams have been stopped!");
    } catch (error) {
      alert("Error stopping exam");
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Manage Test</h2>
      
      <label className="block font-semibold">Select Category:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select</option>
        <option value="Coding">Coding</option>
        <option value="Math">Math</option>
        <option value="Behavioral">Behavioral</option>
        <option value="Aptitude">Aptitude</option>
      </select>

      {/* Start and Stop Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={!category}
        >
          Start Exam
        </button>

        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop Exam
        </button>
      </div>
    </div>
  );
};

export default StartTest;
