import { useEffect, useState } from "react";
import MonthTable from "../MonthTable/MonthTable";
import axios from "axios";

const MonthContainer = ({ monthName, year, month }) => {
  const [records, SetRecords] = useState([]);
  useEffect(() => {
    const GetRecords = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}records/bymonth`, {
          params: { month, year },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            SetRecords(response.data);
          }
        })
        .catch((error) => SetRecords([]));
    };
    GetRecords();
  }, [year]);

  return (
    <div className="py-16">
      <div className=" text-7xl text-center ">{monthName}</div>
      <div className="overflow-x-auto">
        <MonthTable data={records} />
      </div>
    </div>
  );
};

export default MonthContainer;
