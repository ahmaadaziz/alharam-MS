import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import useSearch from "../Hooks/useSearch";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const filtered = useSearch(rooms, search);

  useEffect(() => {
    const getRooms = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}rooms`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => setRooms(res.data))
        .catch((err) => console.error(err));
    };
    getRooms();
  }, []);

  return (
    <div>
      <BackButton url="../" />
      <h1 className="w-full text-center text-3xl m-4">All Rooms</h1>
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
                Room Number
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Seats
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Free Seats
              </th>
              <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
                Residents
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0
              ? filtered.map((room, index) => (
                  <tr
                    key={index}
                    className="border-collapse border-2 border-black text-left p-2 text-2xl "
                  >
                    <td className="border-collapse border-2 border-black text-center">
                      {room.number}
                    </td>
                    <td className="border-collapse border-2 border-black text-center">
                      {room.seats}
                    </td>
                    <td className="border-collapse border-2 border-black text-center">
                      {room.freeSeats}
                    </td>
                    <td className="border-collapse border-2 border-black text-center text-blue-600">
                      {room.residents.map((resident, i) => (
                        <Link to={`../residents/${resident._id}`}>
                          <p key={i} className="m-3">
                            {resident.name}
                          </p>
                        </Link>
                      ))}
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

export default Rooms;
