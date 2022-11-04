import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import MeterTable from "../components/MeterTable/MeterTable";
import useSearch from "../Hooks/useSearch";
import axios from "axios";

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const filtered = useSearch(rooms, search);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let values = [];
    for (
      let index = 0;
      index < e.target.elements.length - 1;
      index = index + 2
    ) {
      values.push({
        id: +e.target.elements[index].id,
        wapda: +e.target.elements[index].value,
        ups: +e.target.elements[index + 1].value,
      });
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}rooms/meter`,
        { values: values },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      )
      .then(() => {
        window.alert("Completed");
        navigate("../");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <h1 className="text-center text-3xl m-4">All Rooms</h1>
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
      <h1 className="text-center text-3xl m-4">Add Meter Readings</h1>
      <div className="overflow-x-auto">
        <form onSubmit={HandleSubmit} className="flex flex-col mt-4 mb-5">
          <MeterTable rooms={rooms} />
          <input
            type={"submit"}
            value={"Update"}
            className=" m-2 p-3 bg-slate-700 uppercase text-2xl rounded cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
};

export default Rooms;
