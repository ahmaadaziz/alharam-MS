import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import FeeTable from "../components/FeeTable/FeeTable";
import BackButton from "../components/BackButton/BackButton";
import axios from "axios";
const dayjs = require("dayjs");

const Fee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const voucherRef = useRef();
  const [record, SetRecord] = useState({});
  const [adjustment, SetAdjustment] = useState("");

  const handlePrint = useReactToPrint({
    content: () => voucherRef.current,
    documentTitle: `${record?.owner?.name}-${dayjs(record?.createdAt).format(
      "MMMM"
    )}`,
    onAfterPrint: () => {
      navigate("../");
    },
  });

  const MakeAdjustment = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}records/adjustment`,
        {
          id,
          adjustment,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          SetRecord(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const GetRecord = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}records`, {
          params: {
            id,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        })
        .then((res) => SetRecord(res.data))
        .catch((err) => console.log(err));
    };
    GetRecord();
  }, [id]);

  return (
    <div>
      <BackButton url="../" />
      <div className="flex flex-col justify-center items-center w-full">
        <div className=" m-4 uppercase flex flex-col justify-center items-center">
          <label htmlFor="adj" className=" text-2xl mb-2 ">
            Adjustment
          </label>
          <input
            type="number"
            id="adj"
            value={adjustment}
            onChange={(e) => SetAdjustment(e.target.valueAsNumber)}
            className="text-black"
          />
          <button
            className="px-5 py-2 text-xl border-2 bg-red-700 text-white uppercase m-5 "
            onClick={MakeAdjustment}
          >
            Submit
          </button>
        </div>
        {record.owner ? (
          <button
            className="px-5 py-2 text-xl border-2 bg-green-700 text-white uppercase m-5 "
            onClick={handlePrint}
          >
            PRINT
          </button>
        ) : null}
        <div
          ref={voucherRef}
          className="flex flex-row justify-evenly items-center"
        >
          <style type="text/css" media="print">
            {
              "\
  @page { size: landscape; }\
"
            }
          </style>
          <FeeTable copy="Office" record={record} />
          <FeeTable copy="Depositor's" record={record} />
        </div>
      </div>
    </div>
  );
};

export default Fee;
