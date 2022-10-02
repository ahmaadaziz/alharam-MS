import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import TableRow from "../TableRow/TableRow";

const Table = ({ data, render }) => {
  const { AllUsers } = useContext(GlobalContext);
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
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            ""
          ) : (
            <th className="border-collapse border-2 border-black text-center p-2 text-2xl">
              UPS
            </th>
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            ""
          ) : (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              Wapda
            </th>
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            ""
          ) : (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              Attendance
            </th>
          )}
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            EBill
          </th>
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-center whitespace-nowrap p-2 text-2xl">
              Total Bill
            </th>
          ) : (
            ""
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-center whitespace-nowrap p-2 text-2xl">
              Amount Paid
            </th>
          ) : (
            ""
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              To
            </th>
          ) : (
            ""
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              Via
            </th>
          ) : (
            ""
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              Date
            </th>
          ) : (
            ""
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              Paid
            </th>
          ) : (
            ""
          )}
          {data[0]?.ebill || data[0]?.ebill === 0 ? (
            <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
              Collected
            </th>
          ) : (
            ""
          )}
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
          {data.map((record, index) =>
            !record.new ? (
              <TableRow
                key={index}
                resident={record.owner}
                record={record}
                render={render}
                users={AllUsers}
              />
            ) : (
              ""
            )
          )}
        </tbody>
      )}
    </table>
  );
};

export default Table;
