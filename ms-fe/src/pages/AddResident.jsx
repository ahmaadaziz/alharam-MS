import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";

const AddResident = () => {
  const navigate = useNavigate();
  const [name, SetName] = useState("");
  const [room, SetRoom] = useState("");
  const [fee, SetFee] = useState("");
  const [wifi, SetWifi] = useState(300);
  const [pkg, SetPackage] = useState("");
  const [security, SetSecurity] = useState("");
  const [joined, SetJoined] = useState("");
  const [meter, SetMeter] = useState("");
  const [arrears, SetArrears] = useState("");
  const [fine, SetFine] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}residents`,
        {
          name,
          room,
          fee,
          wifi,
          package: pkg,
          security,
          joined,
          ...(meter && { meter: meter }),
          arrears,
          fine,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.alert("New Resident Added");
          navigate("../../");
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
            <label htmlFor="name" className=" text-2xl mr-2 ">
              Name:
            </label>
            <input
              required
              type="text"
              id="name"
              className=" w-fit p-2 text-black "
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />

            <label htmlFor="room" className=" text-2xl mr-2 ">
              Room:
            </label>
            <input
              required
              type="number"
              id="room"
              className=" w-fit p-2 text-black "
              value={room}
              onChange={(e) => SetRoom(e.target.valueAsNumber)}
            />

            <label htmlFor="fee" className=" text-2xl mr-2 ">
              fee:
            </label>
            <input
              required
              type="number"
              id="fee"
              className=" w-fit p-2 text-black "
              value={fee}
              onChange={(e) => SetFee(e.target.valueAsNumber)}
            />

            <label htmlFor="package" className=" text-2xl mr-2 ">
              Package:
            </label>
            <input
              required
              type="number"
              id="package"
              className=" w-fit p-2 text-black "
              value={pkg}
              onChange={(e) => SetPackage(e.target.valueAsNumber)}
            />

            <label htmlFor="wifi" className=" text-2xl mr-2 ">
              WIFI:
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
            </select>
          </div>
          <div className="flex flex-col">
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
          </div>
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

export default AddResident;
