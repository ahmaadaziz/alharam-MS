import React from "react";
import MonthTableRow from "../MonthTableRow/MonthTableRow";

const MonthTable = ({ data }) => {
  return (
    <table className=" border-collapse border-2 border-black ">
      <thead>
        <tr>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            Name
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Room
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Fee
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Wifi
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Package
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Arrears
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Fine
          </th>
          <th className="border-collapse border-2 border-black text-center p-2 text-2xl">
            UPS
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Wapda
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Attendance
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            EBill
          </th>
          <th className="border-collapse border-2 border-black text-center whitespace-nowrap p-2 text-2xl">
            Total Bill
          </th>
          <th className="border-collapse border-2 border-black text-center whitespace-nowrap p-2 text-2xl">
            Amount Paid
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            To
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Via
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Date
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Paid
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Collected
          </th>
        </tr>
      </thead>
      {data.length === 0 ? (
        <thead>
          <tr className=" text-center ">
            <th colSpan={20} className="text-4xl">
              No data Available!
            </th>
          </tr>
        </thead>
      ) : (
        <tbody>
          {data?.map((record, index) => (
            <MonthTableRow
              key={index}
              resident={record.owner}
              record={record}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};

export default MonthTable;
