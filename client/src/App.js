import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import Register from "./pages/register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Profile from "./pages/profile";
function App() {
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!getAccessToken();
  };

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
