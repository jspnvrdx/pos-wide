import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//* MUI Components
import { Container, TextField, Input } from "@mui/material";
import { red } from "@mui/material/colors";
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
      <Container maxWidth="sm">
        <img src={Logo} alt="POS-WIDE" />
        <div className="login">
          <Container sx={{ bgcolor: red[400] /* , borderRadius: "20px" */ }}>
            <form onSubmit={formSubmit}>
              {/* <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={(e) => handleOnchange(e)}
              /> */}
              <Input
                name="username"
                value={username}
                inputProps={{ placeholder: "Username" }}
                onChange={(e) => handleOnchange(e)}
              />
              <Input
                type="password"
                name="password"
                value={password}
                inputProps={{ placeholder: "Password" }}
                onChange={(e) => handleOnchange(e)}
              />
              <button>Login</button>
            </form>
          </Container>
        </div>
        <Link to={"/register"}>REGISTER</Link>
      </Container>
    </>
  );
};

export default Login;
