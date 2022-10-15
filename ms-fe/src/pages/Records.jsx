import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MonthContainer from "../components/MonthContainer/MonthContainer";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";
const dayjs = require("dayjs");
const localeData = require("dayjs/plugin/localeData");
dayjs.extend(localeData);

const Records = () => {
  const { year } = useParams();
  const [pagesCount, SetPagesCount] = useState([]);
  const navigate = useNavigate();
  const months = dayjs().localeData().months();

  const ChangePage = (yearPage) => {
    navigate(`../${yearPage}`);
  };

  useEffect(() => {
    const GetPageCount = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}records/pages-count`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => {
          SetPagesCount(res.data);
        })
        .catch((error) => console.log(error));
    };
    GetPageCount();
  }, []);

  return (
    <div>
      <BackButton url="../../" />
      <div className="flex flex-row justify-center items-center border-b-2 border-black">
        {pagesCount.map((yearPage, i) => (
          <button
            key={i}
            onClick={() => ChangePage(yearPage)}
            className={`m-4 hover:border-b-2 hover:border-gold ${
              yearPage === +year ? "text-3xl text-gold" : "text-xl"
            }`}
          >
            {yearPage}
          </button>
        ))}
      </div>
      {months.map((month, i) => (
        <MonthContainer key={i} monthName={month} month={i} year={year} />
      ))}
    </div>
  );
};

export default Records;
