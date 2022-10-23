import { useState, useEffect } from "react";
import axios from "axios";

const RoomForm = ({ roomForm, currentResident, setCurrentResident }) => {
  const [roomSwtich, setRoomSwtich] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [room, SetRoom] = useState(false);
  const [residents, setResidents] = useState([]);
  const [resident, setResident] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (roomSwtich) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}resident/changeroom`,
          {
            resident1: currentResident,
            resident2: resident,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setCurrentResident(res.data);
          window.alert("Rooms switched.");
        })
        .catch((error) => {
          window.alert(error.response.data.message);
          console.log(error);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}resident/changeroom`,
          {
            resident: currentResident,
            toroom: room,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setCurrentResident(res.data);
          window.alert("Room Successfully Changed.");
        })
        .catch((error) => {
          window.alert(error.response.data.message);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const getFreeRooms = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}rooms/free`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => setAvailableRooms(res.data))
        .catch((err) => console.error(err));
    };
    const getActiveResidents = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}residents/active`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => setResidents(res.data))
        .catch((err) => console.error(err));
    };
    getFreeRooms();
    getActiveResidents();
  }, []);

  return (
    <form
      onSubmit={HandleSubmit}
      className={`mx-5 my-7 border-t-2 ${roomForm ? "" : "hidden"}`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center mt-3">
          <input
            id="switch"
            type={"checkbox"}
            className=" mr-3 w-8 h-8"
            checked={roomSwtich}
            onChange={(e) => setRoomSwtich(e.target.checked)}
          />
          <label htmlFor="Switch" className=" w-fit">
            Switch Rooms?
          </label>
        </div>
        <div className={`${roomSwtich ? "" : "hidden"}`}>
          <label htmlFor="wapda">Switch With:</label>
          <select
            name="room"
            id="room"
            className=" w-fit p-2 text-black "
            onChange={(e) => setResident(e.target.value)}
          >
            <option value={false}>--Select Resident--</option>
            {residents?.map((resident, i) => {
              if (resident.name !== currentResident?.name) {
                return (
                  <option key={i} value={resident._id}>
                    {resident.name + "-" + resident.room.number}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className={`${roomSwtich ? "hidden" : ""}`}>
          <label htmlFor="attendance">To Room:</label>
          {availableRooms.length > 0 ? (
            <select
              name="room"
              id="room"
              className=" w-fit p-2 text-black "
              onChange={(e) => SetRoom(e.target.value)}
            >
              <option value={false}>--Select Room--</option>
              {availableRooms?.map((room, i) => {
                if (room.number !== currentResident?.room?.number) {
                  return (
                    <option key={i} value={room._id}>
                      {room.number + "-" + room.freeSeats}
                    </option>
                  );
                }
              })}
            </select>
          ) : (
            <p>No rooms available. Please make space first.</p>
          )}
        </div>
        <input
          type="submit"
          value={`${roomSwtich ? "Switch Rooms" : "Change Room"}`}
          className={`px-5 py-2 mt-4 text-2xl border-2 bg-green-600 text-white uppercase mr-5 ${
            !roomSwtich && availableRooms.length === 0 ? "hidden" : ""
          }`}
        />
      </div>
    </form>
  );
};

export default RoomForm;
