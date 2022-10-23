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
import AllUsers from "./pages/AllUsers";
import AllResidents from "./pages/AllResidents";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
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
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
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
            path="/residents"
            element={User ? <AllResidents /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/residents/:id"
            element={User ? <Resident /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/residents/add"
            element={User ? <AddResident /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/residents/fee/:id"
            element={User ? <Fee /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/users"
            element={User ? <AllUsers /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/users/:id"
            element={User ? <UserPage /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/rooms"
            element={User ? <Rooms /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/rooms/add"
            element={User ? <AddRoom /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
