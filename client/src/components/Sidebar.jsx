import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/create-test" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">
            Create Test
          </Link>
        </li>
        <li>
          <Link to="/start-test" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">
            Start Test
          </Link>
        </li>
        <li>
          <Link to="/update-test" className="block p-2 bg-gray-700 rounded hover:bg-gray-600">
            Update Test
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
