import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//* Fonts
import "@fontsource/inder";

// Components
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const request = await fetch("http://localhost:8000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseReq = await request.json();

      parseReq === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

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
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        theme={"dark"}
        newestOnTop
      />
    </>
  );
}

export default App;
