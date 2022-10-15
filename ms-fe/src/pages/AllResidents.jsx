import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import useSearch from "../Hooks/useSearch";
import axios from "axios";
const dayjs = require("dayjs");

const AllResidents = () => {
  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");
  const filtered = useSearch(residents, search);

  useEffect(() => {
    const getResidents = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}residents/all`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => setResidents(res.data))
        .catch((err) => console.error(err));
    };
    getResidents();
  }, []);

  return (
    <div>
      <BackButton url="../" />
      <h1 className="w-full text-center text-3xl m-4">All Residents</h1>
      <div className=" flex flex-col justify-center items-start ml-2 mb-2">
        <label htmlFor="resident" className="text-2xl mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Name or Room Number"
          id="resident"
          value={search}
          className="w-fit text-xl text-black"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className=" border-collapse border-2 border-black ">
          <thead>
            <tr>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Name
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Room
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Active
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Joined
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Clearance Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0
              ? filtered.map((resident, index) => (
                  <tr
                    key={index}
                    className="border-collapse border-2 border-black text-left p-2 text-2xl "
                  >
                    <td className="border-collapse border-2 border-black text-center text-blue-600">
                      <Link to={`../residents/${resident._id}`}>
                        {resident.name}
                      </Link>
                    </td>
                    <td className="border-collapse border-2 border-black text-center">
                      {resident.room}
                    </td>
                    <td className="border-collapse border-2 border-black text-center">
                      {resident.active ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-green-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </td>
                    <td className="border-collapse border-2 border-black text-center">
                      {dayjs(resident.joined).format("DD MMMM YYYY")}
                    </td>
                    <td className="border-collapse border-2 border-black text-center">
                      {resident.active
                        ? "-"
                        : dayjs(resident.clearanceDate).format("DD MMMM YYYY")}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllResidents;
