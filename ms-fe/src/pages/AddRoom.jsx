import { useState } from "react";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";

const AddRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [ups, setUps] = useState("");
  const [wapda, setWapda] = useState("");
  const [totalMR, setTotalMR] = useState("");
  const [overUnits, setOverUnits] = useState("");
  const [seats, setSeats] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}rooms`,
        {
          roomNumber,
          ups,
          wapda,
          totalMR,
          overUnits,
          seats,
          freeSeats: seats,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.alert("Room Created!");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <BackButton url="../" />
      <form onSubmit={HandleSubmit} className="p-4">
        <div className="flex flex-col msm:flex-row justify-evenly items-center">
          <div className="flex flex-col ">
            <label htmlFor="number" className=" text-2xl mr-2 ">
              Room Number:
            </label>
            <input
              required
              type={"number"}
              id="number"
              className=" w-fit p-2 text-black "
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.valueAsNumber)}
            />

            <label htmlFor="ups" className=" text-2xl mr-2 ">
              UPS:
            </label>
            <input
              required
              type="number"
              id="ups"
              className=" w-fit p-2 text-black "
              value={ups}
              onChange={(e) => setUps(e.target.valueAsNumber)}
            />

            <label htmlFor="wapda" className=" text-2xl mr-2 ">
              Wapda:
            </label>
            <input
              required
              type="number"
              id="wapda"
              className=" w-fit p-2 text-black "
              value={wapda}
              onChange={(e) => setWapda(e.target.valueAsNumber)}
            />

            <label htmlFor="tm" className=" text-2xl mr-2 ">
              Total Meter:
            </label>
            <input
              required
              type="number"
              id="tm"
              className=" w-fit p-2 text-black "
              value={totalMR}
              onChange={(e) => setTotalMR(e.target.valueAsNumber)}
            />

            <label htmlFor="overUnits" className=" text-2xl mr-2 ">
              Over Units:
            </label>
            <input
              required
              type="number"
              id="overUnits"
              className=" w-fit p-2 text-black "
              value={overUnits}
              onChange={(e) => setOverUnits(e.target.valueAsNumber)}
            />

            <label htmlFor="seats" className=" text-2xl mr-2 ">
              Seats:
            </label>
            <input
              required
              type="number"
              id="seats"
              className=" w-fit p-2 text-black "
              value={seats}
              onChange={(e) => setSeats(e.target.valueAsNumber)}
            />

            {/* <label htmlFor="wifi" className=" text-2xl mr-2 ">
              Over Units:
            </label>
            <select
              name="WIFI"
              id="wifi"
              className=" w-fit p-2 text-black "
              onChange={(e) => SetWifi(e.target.value)}
            >
              <option value="300">Mobile</option>
              <option value="600">Laptop</option>
              <option value="900">Mobile + Laptop</option>
            </select> */}
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="date" className=" text-2xl mr-2 ">
              Joining Date:
            </label>
            <input
              required
              type="date"
              id="date"
              className=" w-fit p-2 text-black "
              value={joined}
              onChange={(e) => SetJoined(e.target.value)}
            />

            <label htmlFor="security" className=" text-2xl mr-2 ">
              Security:
            </label>
            <input
              required
              type="number"
              id="security"
              className=" w-fit p-2 text-black "
              value={security}
              onChange={(e) => SetSecurity(e.target.valueAsNumber)}
            />

            <label htmlFor="meter" className=" text-2xl mr-2 ">
              Previous Meter:
            </label>
            <input
              type="number"
              id="meter"
              className=" w-fit p-2 text-black "
              value={meter}
              onChange={(e) => SetMeter(e.target.valueAsNumber)}
            />

            <label htmlFor="arrears" className=" text-2xl mr-2 ">
              Arrears:
            </label>
            <input
              required
              type="number"
              id="arrears"
              className=" w-fit p-2 text-black "
              value={arrears}
              onChange={(e) => SetArrears(e.target.valueAsNumber)}
            />

            <label htmlFor="fine" className=" text-2xl mr-2 ">
              Fine:
            </label>
            <input
              required
              type="number"
              id="fine"
              className=" w-fit p-2 text-black "
              value={fine}
              onChange={(e) => SetFine(e.target.valueAsNumber)}
            />
          </div> */}
          <input
            type="submit"
            value="Submit"
            className="px-5 py-2 text-xl border-2 bg-green-700 text-white uppercase mr-5 "
          />
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
