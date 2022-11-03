import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import CollectedContainer from "../components/CollectedContainer/CollectedContainer";
import AddTab from "../components/AddTab/AddTab";
import axios from "axios";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [render, setRender] = useState(false);

  useEffect(() => {
    const GetUser = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}users/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => console.log(error));
    };
    GetUser();
  }, [id]);

  return (
    <div>
      <BackButton url="../../" />
      <div className="flex flex-col msm:flex-row msm:justify-between">
        <div className="m-10">
          <p className=" text-3xl mb-3">
            Name:{" "}
            <span className="underline font-semibold uppercase whitespace-nowrap">
              {user?.name}
            </span>
          </p>

          <div className="overflow-x-auto ">
            {user._id ? (
              <CollectedContainer
                id={user._id}
                setRender={setRender}
                render={render}
              />
            ) : null}
          </div>
        </div>
        <div>
          {user._id ? <AddTab id={user._id} setRender={setRender} /> : null}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
