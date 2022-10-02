import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Records from "./pages/Records";
import Resident from "./pages/Resident";
import AddResident from "./pages/AddResident";
import UserPage from "./pages/UserPage";
import Fee from "./pages/Fee";
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
          <Route exact path="/allrecords">
            <Route
              path=":year"
              element={User ? <Records /> : <Navigate to="/" />}
            />
            <Route path="" element={User ? <Records /> : <Navigate to="/" />} />
          </Route>
          <Route
            exact
            path="/resident/:id"
            element={User ? <Resident /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/resident/add"
            element={User ? <AddResident /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/resident/fee/:id"
            element={User ? <Fee /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/user/:id"
            element={User ? <UserPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
