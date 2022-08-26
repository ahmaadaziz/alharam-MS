import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios";

function App() {
  const { User, SetUser } = useContext(GlobalContext);

  useEffect(() => {
    const autoLogin = () => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}users/login-auto`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            SetUser(response.data);
          }
          throw new Error();
        })
        .catch((error) => {
          // console.error(error);
        });
    };
    if (!User) {
      autoLogin();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={User ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            exact
            path="/dashboard"
            element={User ? <Home /> : <Navigate to="/" />}
          />
          {/* <Route path="/dashboard" element={<Home />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
