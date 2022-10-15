import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { SetUser } = useContext(GlobalContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}users/login`,
        {
          email: userName + "@gmail.com",
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        SetUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((_error) => {
        window.alert("Incorrect Email or Password!");
        setUserName("");
        setPassword("");
      });
  };

  return (
    <div>
      <form
        className=" h-screen w-full flex flex-col justify-center items-center"
        onSubmit={HandleSubmit}
      >
        <label htmlFor="username" className="m-3 text-3xl">
          Name/Email
        </label>
        <input
          id="username"
          type={"text"}
          placeholder="Enter Name/Email"
          value={userName}
          className="px-5 py-2 text-2xl border-[2px] border-black bg-zinc-800"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password" className="m-3 text-3xl">
          Password
        </label>
        <input
          id="password"
          type={"password"}
          placeholder="Enter password"
          value={password}
          className="px-5 py-2 text-2xl border-[2px] border-black bg-zinc-800"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Login"
          className="m-5 px-5 py-2 text-3xl border-2 bg-black text-white "
        />
      </form>
    </div>
  );
};

export default Login;
