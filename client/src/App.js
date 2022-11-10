import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkLogin = (props) => {
    return !isAuthenticated ? (
      <Login {...props} setAuth={setAuth} />
    ) : (
      <Navigate to={"/dashboard"} />
    );
  };
  const checkRegister = (props) => {
    return !isAuthenticated ? (
      <Register {...props} setAuth={setAuth} />
    ) : (
      <Navigate to={"/dashboard"} />
    );
  };

  const checkDashboard = (props) => {
    return isAuthenticated ? (
      <Dashboard {...props} setAuth={setAuth} />
    ) : (
      <Navigate to={"/login"} />
    );
  };

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={checkLogin()} />
          <Route exact path="/login" element={checkLogin()} />
          <Route exact path="/register" element={checkRegister()} />
          <Route exact path="/dashboard" element={checkDashboard()} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
