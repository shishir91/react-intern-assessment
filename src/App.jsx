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
// import "bootstrap/dist/css/bootstrap.css"

function App() {
  return (
    <div>
      <Router>
        <nav className="">
          <Navbar />
        </nav>
        <main style={{ height: "100vh" }} className="bg-gray-300">
          <Routes>
            {localStorage.getItem("login") ? (
              <Route index element={<Homepage />} />
            ) : (
              <Route index element={<Login />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/piechart" element={<Piechar />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
