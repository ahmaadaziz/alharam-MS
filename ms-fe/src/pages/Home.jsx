// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalState";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import TableContainer from "../components/TableContainer/TableContainer";
import axios from "axios";

const Home = () => {
  // const { User } = useContext(GlobalContext);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const getRecords = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}records/latest`, {
          withCredentials: true,
        })
        .then((response) => {
          const recordsArr = [];
          recordsArr.push(response.data.newRecords);
          recordsArr.push(response.data.oldRecords);
          // console.log(recordsArr);
          setRecords(recordsArr);
          // console.log(records);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRecords();
  }, []);
  return (
    <div>
      <Navbar />
      {console.log(records)}
      {records.map((table) => (
        <TableContainer table={table} />
      ))}
    </div>
  );
};

export default Home;
