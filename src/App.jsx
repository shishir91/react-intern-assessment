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
import { useEffect, useState } from "react";
import Piechar from "./pages/piechar";

function App() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <div>
      <nav className="">
        <Navbar />
      </nav>
      <main>
        <Router>
          <Routes>
            {token ? (
              <Route index element={<Homepage />} />
            ) : (
              <Route index element={<Login />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/piechart" element={<Piechar />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
