import { useNavigate } from "react-router-dom";

const BackButton = ({ url }) => {
  const navigate = useNavigate();
  const HandleClick = () => {
    navigate(url);
  };

  return (
    <div className="w-full border-b-2 border-white p-4">
      <button
        className="px-5 py-2 text-2xl border-2 bg-black text-white uppercase mr-5 "
        onClick={HandleClick}
      >
        Back
      </button>
    </div>
  );
};

export default BackButton;
