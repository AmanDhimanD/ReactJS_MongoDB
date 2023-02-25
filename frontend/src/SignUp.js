import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    /* use effect for the check the user is already Log in  */
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/login");
    }
  });
  const collectData = async () => {
    if (email !== "" && password !== "" && name !== "") {
      //console.log(name, email, password);
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.name) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/welcome");
      } else {
        alert("Please Fill up the data");
      }
    }
  };

  return (
    <>
      <center>
        <div>
          <h1>Register</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Enter your Name"
          />
          <br />
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="Enter your Email"
            required
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
            required
          />
          <br />
          <br />
          <button onClick={collectData}>Sign Up</button>
        </div>
      </center>
    </>
  );
};

export default SignUp;
