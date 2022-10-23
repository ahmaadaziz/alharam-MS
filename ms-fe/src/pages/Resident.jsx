import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import ResidentTable from "../components/ResidentTable/ResidentTable";
import RoomForm from "../components/RoomForm/RoomForm";
import axios from "axios";
const dayjs = require("dayjs");

const Resident = () => {
  const [resident, SetResident] = useState({});
  const [clearanceForm, SetClearanceForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [seats, setSeats] = useState("");
  const [roomForm, SetRoomForm] = useState(false);
  const [ups, SetUps] = useState("");
  const [wapda, SetWapda] = useState("");
  const [attendance, SetAttendance] = useState("");
  const [ttlAttendance, SetTtlAttendance] = useState("");
  const [notice, SetNotice] = useState(false);
  const [render, SetRender] = useState(false);
  const { id } = useParams();

  const HandleClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}residents/changeseats`,
        {
          resident,
          seats,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setEdit(false);
        SetResident(res.data);
        window.alert("Successfully changed seats.");
      })
      .catch((err) => window.alert(err.response.data));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}residents/clearance`,
        {
          id,
          ups,
          wapda,
          attendance,
          totalAttendance: ttlAttendance,
          notice,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        SetRender((current) => !current);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const GetResident = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}residents`, {
          params: {
            id,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => {
          setSeats(res.data.seats);
          SetResident(res.data);
        })
        .catch((err) => SetResident({}));
    };
    GetResident();
  }, [id, render]);

  return (
    <div>
      <BackButton url="../" />
      <div className="flex flex-col msm:flex-row justify-between items-start">
        <div className=" m-20 flex flex-col msm:flex-row">
          <div>
            <p className=" text-3xl mb-3">
              Name:{" "}
              <span className="underline font-semibold">{resident?.name}</span>
            </p>
            <p className=" text-3xl mb-3">
              Room:{" "}
              <span className="underline font-semibold">
                {resident?.room?.number}
              </span>
            </p>
            <p className=" text-3xl mb-3">
              Seats:{" "}
              {edit ? (
                <input
                  id="seats"
                  type={"number"}
                  className=" w-16 text-black"
                  value={seats}
                  onChange={(e) => setSeats(e.target.valueAsNumber)}
                />
              ) : (
                <span className="underline font-semibold">
                  {resident?.seats}
                </span>
              )}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 inline cursor-pointer"
                onClick={() => setEdit((current) => !current)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </p>
            <p className=" text-3xl mb-3">
              Fee:{" "}
              <span className="underline font-semibold">{resident?.fee}</span>
            </p>
            <p className=" text-3xl mb-3">
              Package:{" "}
              <span className="underline font-semibold">
                {resident?.package}
              </span>
            </p>
          </div>
          <div className=" msm:ml-20">
            <p className=" text-3xl mb-3">
              WiFi:{" "}
              <span className="underline font-semibold">{resident?.wifi}</span>
            </p>
            <p className=" text-3xl mb-3">
              Joined:{" "}
              <span className="underline font-semibold">
                {dayjs(resident?.joined).format("D MMMM YYYY")}
              </span>
            </p>
            <p className=" text-3xl mb-3">
              Active:{" "}
              <span className="underline font-semibold">
                {resident?.active ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-green-600 inline-flex "
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
                    className="w-10 h-10 text-red-600 inline-flex "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </span>
            </p>
            {!resident?.active ? (
              <p className=" text-3xl mb-3">
                Left:{" "}
                <span className="underline font-semibold">
                  {dayjs(resident?.clearanceDate).format("D MMMM YYYY")}
                </span>
              </p>
            ) : (
              ""
            )}
            {edit ? (
              <input
                className="px-5 py-2 mt-4 text-2xl border-2 bg-green-600 text-white uppercase mr-5 "
                type="button"
                value="Save"
                onClick={HandleClick}
              />
            ) : null}
          </div>
        </div>
        <div
          className={`mt-16 mr-20 ml-20 ${resident?.active ? "" : "hidden"}`}
        >
          <button
            className="px-5 py-2 text-2xl border-2 bg-black text-white uppercase mr-5 ml-5 my-5 "
            onClick={() => SetRoomForm((current) => !current)}
          >
            Change Room
          </button>
          <RoomForm
            roomForm={roomForm}
            currentResident={resident}
            setCurrentResident={SetResident}
          />
          <button
            className="px-5 py-2 text-2xl border-2 bg-black text-white uppercase mr-5 ml-5 my-5 "
            onClick={() => SetClearanceForm((current) => !current)}
          >
            Clearance
          </button>
          <form
            onSubmit={HandleSubmit}
            className={`mx-5 my-7 border-t-2  ${clearanceForm ? "" : "hidden"}`}
          >
            <div className="flex flex-col">
              <label htmlFor="ups">UPS</label>
              <input
                id="ups"
                type={"number"}
                className="text-black"
                value={ups}
                onChange={(e) => SetUps(e.target.valueAsNumber)}
              />
              <label htmlFor="wapda">WAPDA</label>
              <input
                id="wapda"
                type={"number"}
                className="text-black"
                value={wapda}
                onChange={(e) => SetWapda(e.target.valueAsNumber)}
              />
              <label htmlFor="attendance">ATTENDANCE</label>
              <input
                id="attendance"
                type={"number"}
                className="text-black"
                value={attendance}
                onChange={(e) => SetAttendance(e.target.valueAsNumber)}
              />
              <label htmlFor="tattendance">TOTAL ATTENDANCE</label>
              <input
                id="tattendance"
                type={"number"}
                className="text-black"
                value={ttlAttendance}
                onChange={(e) => SetTtlAttendance(e.target.valueAsNumber)}
              />
              <div className="flex flex-row items-center mt-3">
                <input
                  id="notice"
                  type={"checkbox"}
                  className=" mr-3 w-8 h-8"
                  onChange={(e) => SetNotice(e.target.checked)}
                />
                <label htmlFor="notice" className=" w-fit">
                  Was Notice Given?
                </label>
              </div>
              <input
                type="submit"
                value="Generate Clearance"
                className="px-5 py-2 mt-4 text-2xl border-2 bg-green-600 text-white uppercase mr-5 "
              />
            </div>
          </form>
        </div>
      </div>
      <div className=" overflow-x-auto ">
        {resident.records ? <ResidentTable data={resident?.records} /> : "N/A"}
      </div>
    </div>
  );
};

export default Resident;
