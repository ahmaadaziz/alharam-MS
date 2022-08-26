import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import axios from "axios";

const Navbar = () => {
  const { User, UnSetUser } = useContext(GlobalContext);

  const handleClick = () => {
    axios.post(
      `${process.env.REACT_APP_API_URL}users/logout`,
      {},
      { withCredentials: true }
    );
    UnSetUser();
  };

  return (
    <div className="flex flex-row justify-between items-center p-4 h-max border-b-2 border-white ">
      <p>{User?.name.toUpperCase()}</p>
      <button
        className="px-5 py-2 text-xl border-2 bg-black text-white uppercase "
        onClick={handleClick}
      >
        Log Out
      </button>
    </div>
  );
};

export default Navbar;
