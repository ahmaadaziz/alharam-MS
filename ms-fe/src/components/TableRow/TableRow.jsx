import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const dayjs = require("dayjs");

const TableRow = ({ resident, record, render, users }) => {
  const navigate = useNavigate();
  const [amountPaid, setAmountPaid] = useState("");
  const [paidTo, setPaidTo] = useState(users[0]?._id);
  const [paidVia, setPaidVia] = useState("cash");
  const [date, setDate] = useState();

  const ToPrintChallan = () => {
    navigate(`../residents/fee/${record._id}`);
  };

  const SubmitPayment = () => {
    if (!amountPaid || !paidTo || !paidVia || !date) {
      return window.alert("Please fill all fields");
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}records/submit-payment`,
        {
          id: record._id,
          date,
          paidTo,
          paidVia,
          amountPaid,
        },
        { withCredentials: true }
      )
      .then(() => {
        render((current) => !current);
      });
  };

  const RemoveFine = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}records/remove-fine`,
        {
          id: record._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        render((current) => !current);
      });
  };

  return (
    <tr className="text-2xl">
      <td
        className={`border-collapse border-2 border-black text-center ${
          record.clearance ? "text-red-600" : "text-blue-600"
        } uppercase`}
      >
        <Link to={`../residents/${resident._id}`}>{resident.name}</Link>
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {resident.room}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {resident.fee}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {resident.wifi}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {resident.package}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.arrears}
      </td>
      <td className="border-collapse border-2 border-black text-center px-2 text-xl">
        <p>{record.fine}</p>
        {!record.fine || record.fine === 0 ? null : (
          <button type={"button"} onClick={RemoveFine}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-10 text-red-600 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </td>
      {record.ebill || record.ebill === 0 ? null : (
        <td className="border-collapse border-2 border-black text-center min-w-min">
          <input
            name="ups"
            id={resident._id}
            rid={record._id}
            type={"text"}
            className="text-black w-full"
            required
          />
        </td>
      )}
      {record.ebill || record.ebill === 0 ? null : (
        <td className="border-collapse border-2 border-black text-center">
          <input
            name="wapda"
            id={resident._id}
            rid={record._id}
            type={"text"}
            className="text-black w-full"
            required
          />
        </td>
      )}
      {record.ebill || record.ebill === 0 ? null : (
        <td className="border-collapse border-2 border-black text-center">
          <input
            name="attendance"
            id={resident._id}
            rid={record._id}
            type={"number"}
            className="text-black w-full"
            required
          />
        </td>
      )}
      <td className="border-collapse border-2 border-black text-center px-4">
        {record.ebill || record.ebill === 0 ? record.ebill : "TBC"}
      </td>
      {record.ebill || record.ebill === 0 ? (
        <td
          className={`border-collapse border-2 border-black text-center ${
            record.clearance ? "text-red-600 font-bold" : ""
          }`}
        >
          {record.totalBill ? record.totalBill : "15000"}
        </td>
      ) : null}
      {(record.ebill || record.ebill === 0) && !record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          <input
            name="amountPaid"
            id={record._id}
            type={"text"}
            value={amountPaid}
            onInput={(e) => setAmountPaid(e.target.value)}
            className="text-black w-full"
            required
          />
        </td>
      ) : record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          {record.amountPaid}
        </td>
      ) : null}
      {(record.ebill || record.ebill === 0) && !record.paid ? (
        <td className="border-collapse border-2 border-black text-center text-black">
          <select
            name="to"
            id={record._id}
            className="uppercase"
            onChange={(e) => setPaidTo(e.target.value)}
          >
            {users?.map((user, i) => (
              <option key={i} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </td>
      ) : record.paid ? (
        <td className="border-collapse border-2 border-black text-center uppercase px-4">
          {record.paidTo.name}
        </td>
      ) : null}
      {(record.ebill || record.ebill === 0) && !record.paid ? (
        <td className="border-collapse border-2 border-black text-center text-black">
          <select
            name="via"
            id={record._id}
            onChange={(e) => setPaidVia(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="jazz">Jazz Cash</option>
            <option value="online">Online</option>
          </select>
        </td>
      ) : record.paid ? (
        <td className="border-collapse border-2 border-black text-center uppercase px-4">
          {record.paidVia}
        </td>
      ) : null}
      {(record.ebill || record.ebill === 0) && !record.paid ? (
        <td className="border-collapse border-2 border-black text-center text-black">
          <input
            type={"date"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </td>
      ) : record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          {dayjs(record.collectionDate).format("DD/MM/YYYY")}
        </td>
      ) : null}
      {record.ebill || record.ebill === 0 ? (
        <td className="border-collapse border-2 border-black">
          {record.paid ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-10 text-green-600 "
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
              className="w-full h-10 text-red-600 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </td>
      ) : null}
      {record.ebill || record.ebill === 0 ? (
        <td className="border-collapse border-2 border-black text-center">
          {record.collected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-10 text-green-600 "
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
              className="w-full h-10 text-red-600 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </td>
      ) : null}
      {(record.ebill || record.ebill === 0) && !record.paid ? (
        <td className="border-collapse border-2 border-black text-center text-black">
          <button
            type={"button"}
            className="text-white text-xl bg-green-600 p-2 rounded "
            onClick={SubmitPayment}
          >
            Submit
          </button>
        </td>
      ) : null}
      {!record.paid && record.totalBill ? (
        <td className="border-collapse border-2 border-black text-center text-black">
          <button
            type={"button"}
            className="text-white text-xl bg-green-600 p-2 m-2 rounded "
            onClick={ToPrintChallan}
          >
            CHALLAN
          </button>
        </td>
      ) : null}
    </tr>
  );
};

export default TableRow;
