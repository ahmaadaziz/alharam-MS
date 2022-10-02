import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TableContainer from "../components/TableContainer/TableContainer";
import axios from "axios";

const Home = () => {
  const { SetAllUsers } = useContext(GlobalContext);
  const [records, setRecords] = useState([[]]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const getRecords = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}records/latest`, {
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
          withCredentials: true,
        })
        .then((response) => SetAllUsers(response.data))
        .catch((error) => console.log(error));
    };
    getRecords();
    GetAllUsers();
  }, [render]);
  return (
    <div>
      <Navbar />
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
