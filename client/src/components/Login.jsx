import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//* MUI Components
import { Container, Input, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";

//* images
import Logo from "./images/logo-small.svg";

// * styles
import "./styles/styles.css";

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
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <img src={Logo} alt="POS-WIDE" />

        <Container
          sx={{ bgcolor: red[400], borderRadius: "20px", padding: "20px" }}
        >
          <Container sx={{ margin: "20px 0" }}>
            <form onSubmit={formSubmit} style={{ paddingTop: "10px" }}>
              <Stack
                direction="column"
                justifyContent={"center"}
                alignItems="center"
                spacing={4}
              >
                <TextField
                  fullWidth
                  className="roundedInput"
                  label="username"
                  name="username"
                  value={username}
                  onChange={(e) => handleOnchange(e)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="password"
                  className="roundedInput"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => handleOnchange(e)}
                  sx={{
                    backgroundColor: "white",
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                    // "& .MuiInputLabel-outlined": {
                    //   textAlign: "center",
                    // },
                  }}
                />
                <button>Login</button>
              </Stack>
            </form>
          </Container>
        </Container>

        <Link to={"/register"}>REGISTER</Link>
      </Container>
    </>
  );
};

export default Login;
