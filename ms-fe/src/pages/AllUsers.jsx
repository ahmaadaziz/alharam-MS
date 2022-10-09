import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";

const AllUsers = () => {
  const navigate = useNavigate();
  const { AllUsers } = useContext(GlobalContext);

  const ToUser = (id) => {
    navigate(`/users/${id}`);
  };
  return (
    <div className="flex flex-col msm:justify-center justify-between items-center">
      <BackButton url="../" />
      {AllUsers.map((user, index) => (
        <button
          key={index}
          className="px-5 py-2 text-xl border-2 bg-green-700 text-white uppercase m-5 msm:mr-5 "
          onClick={() => ToUser(user._id)}
        >
          {user?.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default AllUsers;
