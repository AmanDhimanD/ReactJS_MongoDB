import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    /* use effect for the check the user is already Log in  */
    /* To make sure no route to pass the link in the address bar direct to navigate the page */
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/welcome");
    }
  }, []);
  const collectData = async () => {
    //console.log(name, email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    //console.log(result)
    //console.log(result);
    //navigate("/welcome");
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/welcome");
    } else {
      alert("Please enter connect Details");
    }
  };

  return (
    <>
      <center>
        <h1>Login page</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          placeholder="Enter your Email"
        />
        <br />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="Enter your Password"
        />
        <br />
        <br />
        <button onClick={collectData}>Login</button>
      </center>
    </>
  );
};

export default Login;
