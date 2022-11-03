import { useEffect, useState } from "react";
import Collected from "../Collected/Collected";
import axios from "axios";

const CollectedContainer = ({ id, setRender, render }) => {
  const [collected, setCollected] = useState([]);
  useEffect(() => {
    const GetTabs = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}tabs/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => setCollected(res.data))
        .catch((err) => console.error);
    };
    GetTabs();
  }, [id, render]);

  return (
    <table className=" border-collapse border-2 border-black ">
      <thead>
        <tr>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            Name
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            Amount
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            Info
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            Amount Paid
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            Difference
          </th>
        </tr>
      </thead>
      {collected.length === 0 ? (
        <thead>
          <tr className=" text-center ">
            <th colSpan={20} className="text-4xl">
              No dues left!
            </th>
          </tr>
        </thead>
      ) : (
        <tbody>
          {collected?.map((tab, index) => (
            <Collected key={index} data={tab} setRender={setRender} />
          ))}
        </tbody>
      )}
    </table>
  );
};

export default CollectedContainer;
