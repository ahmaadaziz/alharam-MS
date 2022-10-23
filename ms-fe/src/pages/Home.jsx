import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TableContainer from "../components/TableContainer/TableContainer";
import axios from "axios";

const dayjs = require("dayjs");
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);

const Home = () => {
  const { SetAllUsers } = useContext(GlobalContext);
  const [records, setRecords] = useState([[]]);
  const [render, setRender] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarRes, setNavbarRes] = useState(true);

  const CreateRecords = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}records/create`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      )
      .then((res) => setRender((current) => !current));
  };

  useEffect(() => {
    const ChangeNavbar = () => {
      const condition = window.innerWidth < 526 ? true : false;
      setNavbarRes(condition);
    };
    const getRecords = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}records/latest`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((response) => {
          const recordsArr = [];
          recordsArr.push(response.data.newRecords);
          if (response.data.oldestRecords) {
            recordsArr.push(response.data.olderRecords);
            recordsArr.push(response.data.oldestRecords);
          } else {
            recordsArr.push(response.data.oldRecords);
          }
          setRecords(recordsArr);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const GetAllUsers = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((response) => SetAllUsers(response.data))
        .catch((error) => console.log(error));
    };
    ChangeNavbar();
    getRecords();
    GetAllUsers();
  }, [render]);
  return (
    <div
      className={`relative ${
        showNavbar && navbarRes ? "top-[-658px]" : "top-0"
      }`}
    >
      <Navbar />
      {navbarRes ? (
        <button
          className="w-full flex justify-center items-center "
          onClick={() => setShowNavbar((current) => !current)}
        >
          {showNavbar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 m-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
              />
            </svg>
          )}
        </button>
      ) : null}
      {dayjs().isSameOrAfter(
        `${dayjs().get("year")}-${dayjs().get("month") + 1}-25`,
        "day"
      ) ? (
        <button
          className="px-5 py-3 text-[2rem] border-2 bg-green-700 text-white uppercase m-5 msm:mr-5 "
          onClick={() => CreateRecords()}
        >
          Create Records
        </button>
      ) : null}
      <div className="flex flex-col-reverse">
        {records.length > 0
          ? records.map((table, index) => (
              <TableContainer key={index} table={table} render={setRender} />
            ))
          : "No data"}
      </div>
    </div>
  );
};

export default Home;
