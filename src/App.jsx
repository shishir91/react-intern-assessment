import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Explore from "./pages/Explore";
import Piechar from "./pages/piechar";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Router>
        <nav className="">
          <Navbar />
        </nav>
        <main style={{ height: "100%" }} className="bg-gray-300">
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/piechart" element={<Piechar />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
