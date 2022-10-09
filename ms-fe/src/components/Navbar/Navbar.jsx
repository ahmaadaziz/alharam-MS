import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const dayjs = require("dayjs");

const Navbar = () => {
  const navigate = useNavigate();
  const { UnSetUser } = useContext(GlobalContext);

  const ToAddResident = () => {
    navigate(`/residents/add`);
  };

  const ToAllUsers = () => {
    navigate(`/users`);
  };

  const ToAllResidents = () => {
    navigate(`/residents`);
  };

  const ToAllRecords = () => {
    navigate(`/allrecords/${dayjs().year()}`);
  };

  const handleClick = () => {
    axios.post(
      `${process.env.REACT_APP_API_URL}users/logout`,
      {},
      { withCredentials: true }
    );
    UnSetUser();
  };

  return (
    <div className="flex flex-col msm:flex-row justify-start msm:justify-between items-center p-4 h-max border-b-2 border-white ">
      <div className="flex flex-col msm:flex-row justify-between items-center">
        <button
          className="px-5 py-2 text-xl border-2 bg-green-700 text-white uppercase m-5 msm:mr-5 "
          onClick={() => ToAllUsers()}
        >
          All Users
        </button>
        <button
          className="px-5 py-2 text-xl border-2 bg-green-700 text-white uppercase m-5 msm:mr-5 "
          onClick={() => ToAllResidents()}
        >
          All Residents
        </button>
      </div>
      <div className="flex flex-col msm:flex-row justify-center items-center">
        <button
          className="px-5 py-2 text-xl border-2 bg-blue-700 text-white uppercase m-5 msm:mr-5 "
          onClick={ToAddResident}
        >
          New Student
        </button>
        <button
          className="px-5 py-2 text-xl border-2 bg-blue-700 text-white uppercase m-5 msm:mr-5 "
          onClick={ToAllRecords}
        >
          All Records
        </button>
        <button
          className="px-5 py-2 text-xl border-2 bg-black text-white uppercase m-5 msm:mr-5 "
          onClick={handleClick}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
