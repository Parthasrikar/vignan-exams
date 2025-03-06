import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CreateTest from "./pages/CreateTest";
import StartTest from "./pages/StartTest";
import UpdateTest from "./pages/UpdateTest";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-5 w-full">
          <Routes>
            <Route path="/create-test" element={<CreateTest />} />
            <Route path="/start-test" element={<StartTest />} />
            <Route path="/update-test" element={<UpdateTest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
