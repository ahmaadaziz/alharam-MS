import ResidentRow from "../ResidentRow/ResidentRow";

const ResidentTable = ({ data }) => {
  return (
    <table className=" border-collapse border-2 border-black ">
      <thead>
        <tr>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl ">
            DATE
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Arrears
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Nxt Arrears
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Fine
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Nxt Fine
          </th>
          <th className="border-collapse border-2 border-black text-center p-2 text-2xl">
            UPS
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Wapda
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Over Units
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Attendance
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            EBill
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Pkg Adjustment
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Adjustment
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
            Collection
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
            <ResidentRow key={index} record={record} />
          ))}
        </tbody>
      )}
    </table>
  );
};

export default ResidentTable;
