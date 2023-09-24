import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import LoginForm from "./component/Login/Login";
import { useState } from "react"; // Import useState

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Store the username

  const handleLogin = (username) => {
    // This function is called when login is successful
    setIsLoggedIn(true);
    setUsername(username); // Set the username
  };

  const handleLogout = () => {
    // Handle logout logic here
    setIsLoggedIn(false);
    setUsername(""); // Clear the username
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home isLoggedIn={isLoggedIn}  username={username} /> : <LoginForm onLogin={handleLogin} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
