import React from "react";

const TableContainer = ({ table }) => {
  return (
    <div className=" mt-4 ">
      <div className=" text-5xl text-center ">
        {new Date(table[0]?.createdAt).toLocaleString("en-US", {
          month: "long",
        })}
      </div>
      <table>
        <caption>
          <div className=" text-5xl text-center ">
            {new Date(table[0]?.createdAt).toLocaleString("en-US", {
              month: "long",
            })}
          </div>
        </caption>
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Room</th>
            <th className="text-left">fee</th>
            <th>Wifi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ahmad Aziz</td>
            <td className="text-center">420</td>
            <td>50000</td>
            <td>3000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableContainer;
