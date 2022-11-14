import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import { Typography } from "@mui/material";

//* images
import Logo from "./images/logo-small.svg";

// * ----------------------------------------

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // destructure
  const { username, password } = inputs;

  const handleOnchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };

      // ! DELETE BEFORE PUBLISH
      // console.log(JSON.stringify(body));

      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      // ! DELETE BEFORE PUBLISH
      // console.log(parseRes.token);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);

        // TODO: Modiify notification
        toast.success("Login Succesfully!");
      } else {
        toast.warn(parseRes);
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // ! DELETE BEFORE PUBLISH
  // console.log(inputs);

  return (
    <>
      <div className="container">
        <img src={Logo} alt="POS-WIDE" />
        <div className="login">
          <form onSubmit={formSubmit}>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => handleOnchange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => handleOnchange(e)}
            />
            <button>Login</button>
          </form>
        </div>
        <Link to={"/register"}>REGISTER</Link>
      </div>
    </>
  );
};

export default Login;
