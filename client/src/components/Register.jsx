import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// images
import Logo from "./images/logo-small.svg";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    questionId: "",
  });

  // destructure
  const { username, password, firstName, lastName, questionId } = inputs;

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  console.log(inputs);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password, firstName, lastName, questionId };

      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      // console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered!");
      } else {
        toast.warn(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form onSubmit={formSubmit}>
        <img src={Logo} alt="POS-WIDE" />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="number"
          name="questionId"
          id="questionId"
          placeholder="Question ID"
          value={questionId}
          onChange={(e) => handleOnChange(e)}
        />
        <button>Register</button>
      </form>
      <Link to={"/login"}>Login</Link>
    </>
  );
};

export default Register;
