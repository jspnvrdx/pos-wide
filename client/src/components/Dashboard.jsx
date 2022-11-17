import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState("");

  async function getName() {
    try {
      const request = await fetch("http://localhost:8000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await request.json();

      // console.log(parseRes);

      setUser(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out!");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1>Hello {user}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
