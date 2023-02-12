# ReactJS_MongoDB
- Setup the Coding

# Backend DeveDevelopment 🤞
## Step the MongoDB compass for ReactJS

- Open the Compass Exe
- Make a New Connection ( copy the URL for local host )

- Create a **Database** 
- Like -> **e-comm**

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdrsxmfn452dg95sgwkw.png)

- Create a **Collection** ( _or in RDBMS called Table_ )

**products** and **users** is the collectiions

- Add the **Data**

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jxi02zx0lpre0vo92q7m.png)

- in insert document 📃 Add some demo data 


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f1hb7h2exv45oajtvvni.png)


**Finally Done**
---------------------------------------------------------------------------------------------------------------------

# Create a ReactJS app with MongoDB connection

In this Project we explain the some functionality of the Login and singup page
with MongoDB Data connection.




## Setup to start 
    Make to folders 📂 
- backend
- froentend


## In the Backend Folder 
install these Required Packages copy this below code and run in cmd

```
npm init 
```
and then

```
  npm i mongooses nodemon express
```




- Create a some files 
    - index.js
```
const express = require("express");
//const mongoose = require('mongoose')
require("../backend/db/config");
const User = require("../backend/db/User");
const cors = require("cors");
const app = express();

app.use(express.json()); //api post krne par jo data aya hai wo json 
//me aajyga
app.use(cors()); // to fix the cors error in the app
app.post("/register", async (req, res) => {
  //res.send("Api in progess.....")
  let user = new User(req.body);
  let result = await user.save();
  /* We dont have to show password in the Console Application in JSON Formate for this */
  /* and Also we can not use the SELECT method as the login for this we use this method */

  result = result.toObject(); // Save as the object then delete the Result Function
  delete result;

  res.send(result); //save posted data in the server (or api )
});

//Login Function
app.post("/login", async (req, res) => {
  /* This if is use to Entering the PAssword and Email id  */
  /* Without one cannt be login  */
  if (req.body.password && req.body.email) {
    /* this select is use to not showing the Password in the Response */
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

//Sign Up Function

app.listen(5000);
/* const connectDB = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://localhost:27017/e-comm");
    const productSchema = new mongoose.Schema({})
    const product = mongoose.model("products", productSchema)
    const data = await product.find()
    console.warn(data)
}
 */
/* app.get("/",(req,res)=>{
    res.send("App is Working..............")
})
 */

//connectDB()
//app.listen(5001);

```
# If nodemon (error) 
- Run this command in a POWER shell (run as administrator)
```
Get-ExecutionPolicy
```
```
Set-ExecutionPolicy Unrestricted
```
- Create a folder in backend
    - db 
        - config.js
        - User.js

- in config.js 
```
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/e-comm", { useNewUrlParser: true })
```
- in User.js 
    - Create a model 
```
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
module.exports = mongoose.model("users", userSchema);

```
## In frotend folder 
Install create app 
```
npx create-react-app ./
```
- in src folder create a new file 
    - src
        - Nav.js
        - Signup.js
        - Component
            - Login.js
            - PrivateComponent.js

```
npm install react-router-dom 
```
#### App.js 
```
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import PrivateComponent from "./component/PrivateComponent";
import Nav from "./Nav";
import SignUp from "./SignUp";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Private Components are use to handle the Session*/}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>Product Component</h1>} />
            <Route path="/add" element={<h1>Add Component</h1>} />
            <Route path="/update" element={<h1>Update Component</h1>} />
            <Route path="/logout" element={<h1>LogOut Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>
          {/* Not need to the sign up tag for the sesion */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

```
#### Nav.js 
```
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  //const Name = (JSON.parse(auth).name)
  //const capitalized = Name.charAt(0).toUpperCase() + Name.slice(1);

  /* To show the log out option in the list before calling this function it is normally Show the SignUp option over there */
  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
      <div>
        {auth ? (
          <ul>
            <li>
              <Link to="/">Product </Link>
            </li>
            <li>
              <Link to="/add">Add Products </Link>
            </li>
            <li>
              <Link to="/update">Update Product </Link>
            </li>
            {/*  <li>
            <Link to="/logout">LogOut </Link>
          </li> */}
            <li>
              <Link to="/profile">Profile </Link>
            </li>

            <Link to="/login" onClick={logOut}>
              LogOut {JSON.parse(auth).name}
            </Link>
          </ul>
        ) : (
          <>
            <ul>
              <Link to="/signup">SignUp </Link> <br />
              <Link to="/login">Login </Link>
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
```

#### SignUp
```
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    /* use effect for the check the user is already Log in  */
    const auth = localStorage.getItem("user"); 
    if (auth) {
      navigate("/");
    }
  });
  const collectData = async () => {
    //console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    //console.warn(result)
    //localStorage.setItem("user", JSON.stringify(result));
    //navigate("/login");
    
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/login");
       //navigate("/");
     } else {
       alert("Please Fill up the data");
     }
  };
  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)} required
      />{" "}
      <br /> <br />
      <input
        type="text"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} required
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} required
      />{" "}
      <br />
      <br />
      <button type="button" onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;

```

#### Login.js 
```
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    /* use effect for the check the user is already Log in  */
    /* To make sure no route to pass the link in the address bar direct to navigate the page */
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    //console.warn(email,password)
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    //console.warn(result);

    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter connect Details");
    }
  };
  return (
    <>
      <div>
        <h2>Login </h2>
        <input
          type="text"
          placeholder="Enter the Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <br /> <br />
        <input
          type="password"
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />{" "}
        <br /> <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
```

#### PrivateComponent
```
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="signup" />;
};

export default PrivateComponent;

```

## in backend folder 
- Run the server 
```
nodemon 
```
and 
## in frontend folder 
- Start the React App 
```
npm start
```

# Finally

# Note : 
- need to add the more details 
- Add Screenshots
