import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function App() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/welcome"
          element={
            <center>
              <h1>Welcome Page</h1>
              <button
                onClick={logOut}
              >
                logout
              </button>
            </center>
          }
        />
      </Routes>
    </>
  );
}

export default App;
