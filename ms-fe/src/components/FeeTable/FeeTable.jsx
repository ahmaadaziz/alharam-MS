import logo from "../../images/logo.png";
const dayjs = require("dayjs");

const FeeTable = ({ copy, record }) => {
  return (
    <table className=" border-collapse border-2 border-black ">
      <tbody>
        <tr>
          <td
            colSpan="3"
            className="border-collapse border-2 border-black text-center"
          >
            <p>
              Transfer online or deposit directly in Meezan Bank A/C
              <br />
              Title: Akhtar Aziz, A/C #{" "}
              <span className=" font-bold ">0224-0101-269-183</span>
            </p>
          </td>
        </tr>
        <tr>
          <td
            colSpan="3"
            className="border-collapse border-2 border-black text-center font-bold"
          >
            {copy} Copy
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Fee Month</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {dayjs(record?.createdAt).add(1, "month").format("MMMM YYYY")}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Due Date</p>
          </td>
          <td className="border-collapse border-2 border-black text-center font-bold">
            {dayjs(record?.createdAt)
              .set("date", 5)
              .add(1, "month")
              .format("DD-MM-YYYY")}
          </td>
        </tr>
        <tr>
          <td className=" flex justify-center items-center">
            <img src={logo} alt="logo" className="h-[100px] w-[100px]" />
          </td>
          <td className="border-collapse border-2 border-black text-center">
            ALHARAM HOSTEL
            <br />
            www.alharamhostel.com
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Name</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.owner?.name}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Room</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.owner?.room?.number}
          </td>
        </tr>
        {record?.owner?.package > 0 ? (
          <tr>
            <td className="border-collapse border-2 border-black text-center">
              <p>Package</p>
            </td>
            <td className="border-collapse border-2 border-black text-center">
              {record?.owner?.package}
            </td>
          </tr>
        ) : null}
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Over Units</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.overUnits}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Attendance</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.attendance}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center font-bold">
            <p>Description</p>
          </td>
          <td className="border-collapse border-2 border-black text-center font-bold">
            Amount (Rupees)
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Rent</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.owner?.fee}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Electricity Bill</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.ebill}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Wifi</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.owner?.wifi}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>Adjustment</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            {record?.adjustment ? record.adjustment : ""}
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>&nbsp;</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center">
            <p>&nbsp;</p>
          </td>
          <td className="border-collapse border-2 border-black text-center">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td className="border-collapse border-2 border-black text-center font-bold">
            <p>Total Fee</p>
          </td>
          <td className="border-collapse border-2 border-black text-center font-bold">
            {record?.totalBill}
          </td>
        </tr>
        <tr>
          <td colSpan="3" className="border-collapse border-2 border-black">
            <p>
              1. Paying this fee voucher constitutes acceptance of the <br />{" "}
              Terms and Conditions of Alharam Hostel, as amended <br /> from
              time to time.
              <br />
              <span className=" font-bold ">
                2. After due date Rs.30 per day late fee fine charged.
              </span>
              <br />
              <span className=" font-bold ">
                3. Rs.30 will be charged for duplicate fee voucher.
              </span>
              <br />
              <span className=" font-bold ">
                4. It is required to message or whatsapp online fee <br />{" "}
                deposit detail or complete photo of deposit receipt.
              </span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FeeTable;
