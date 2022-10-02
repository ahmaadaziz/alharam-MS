import React from "react";
const dayjs = require("dayjs");

const ResidentRow = ({ record }) => {
  return (
    <tr>
      <td
        className={`border-collapse border-2 border-black text-center ${
          record.clearance ? "text-red-600" : ""
        }`}
      >
        {dayjs(record.createdAt).format("MMMM, YYYY")}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.arrears ? record.arrears : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.nxtArrears ? record.nxtArrears : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center px-2 text-xl">
        {record.fine ? record.fine : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center px-2 text-xl">
        {record.nxtFine ? record.nxtFine : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center min-w-min">
        {record.ups ? record.ups : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.wapda ? record.wapda : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.newMR ? record.newMR : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.overUnits ? record.overUnits : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.attendance ? record.attendance : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.ebill || record.ebill === 0 ? record.ebill : "TBC"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.pkgAdj ? record.pkgAdj : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.adjustment ? record.adjustment : "N/A"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {record.totalBill ? record.totalBill : "N/A"}
      </td>
      {record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          {record.amountPaid}
        </td>
      ) : (
        <td className="border-collapse border-2 border-black text-center">
          N/A
        </td>
      )}
      {record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          {record.paidTo}
        </td>
      ) : (
        <td className="border-collapse border-2 border-black text-center">
          N/A
        </td>
      )}
      {record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          {record.paidVia}
        </td>
      ) : (
        <td className="border-collapse border-2 border-black text-center">
          N/A
        </td>
      )}
      {record.paid ? (
        <td className="border-collapse border-2 border-black text-center">
          {dayjs(record.collectionDate).format("DD/MM/YYYY")}
        </td>
      ) : (
        <td className="border-collapse border-2 border-black text-center">
          N/A
        </td>
      )}
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
    </tr>
  );
};

export default ResidentRow;
