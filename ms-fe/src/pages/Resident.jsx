import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import ResidentTable from "../components/ResidentTable/ResidentTable";
import axios from "axios";
const dayjs = require("dayjs");

const Resident = () => {
  const [resident, SetResident] = useState({});
  const [form, SetForm] = useState(false);
  const [ups, SetUps] = useState("");
  const [wapda, SetWapda] = useState("");
  const [attendance, SetAttendance] = useState("");
  const [notice, SetNotice] = useState(false);
  const [render, SetRender] = useState(false);
  const { id } = useParams();

  const OpenForm = () => {
    SetForm((current) => !current);
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
          notice,
        },
        {
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
          withCredentials: true,
        })
        .then((res) => SetResident(res.data))
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
              <span className="underline font-semibold">{resident?.room}</span>
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
          </div>
        </div>
        <div className={`mt-16 mr-20 ${resident?.active ? "" : "hidden"}`}>
          <button
            className="px-5 py-2 text-2xl border-2 bg-black text-white uppercase mr-5 "
            onClick={OpenForm}
          >
            Clearance
          </button>
          <form
            onSubmit={HandleSubmit}
            className={`mt-5 ${form ? "" : "hidden"}`}
          >
            <div className="flex flex-col">
              <label htmlFor="ups">UPS</label>
              <input
                id="ups"
                type={"number"}
                className="text-black"
                value={ups}
                onChange={(e) => SetUps(e.target.value)}
              />
              <label htmlFor="wapda">WAPDA</label>
              <input
                id="wapda"
                type={"number"}
                className="text-black"
                value={wapda}
                onChange={(e) => SetWapda(e.target.value)}
              />
              <label htmlFor="attendance">ATTENDANCE</label>
              <input
                id="attendance"
                type={"number"}
                className="text-black"
                value={attendance}
                onChange={(e) => SetAttendance(e.target.value)}
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
