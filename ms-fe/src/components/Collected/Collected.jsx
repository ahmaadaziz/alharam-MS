import { useState } from "react";
import axios from "axios";

const Collected = ({ data, setRender }) => {
  const [amount, setAmount] = useState(0);

  const handleClick = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}tabs/update`,
        {
          amount,
          id: data._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setRender((current) => !current);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr>
      <td className="border-collapse border-2 border-black text-center">
        {data?.record?.owner?.name ? data?.record?.owner?.name : data?.title}
      </td>
      <td
        className={`border-collapse border-2 border-black text-center ${
          data?.amountPaid > data?.amount ||
          data?.amountPaid > data?.record?.totalBill
            ? "text-red-600"
            : "text-green-700"
        }`}
      >
        {data?.record?.totalBill ? data?.record?.totalBill : data?.amount}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        {data?.amountPaid ? data?.amountPaid : "-"}
      </td>
      <td className="border-collapse border-2 border-black text-center">
        <input
          className="text-black p-2 w-max"
          value={amount}
          type="number"
          id="amount"
          onChange={(e) => setAmount(e.target.valueAsNumber)}
        />
      </td>
      <td className="border-collapse border-2 border-black text-center">
        <button
          className="text-white text-xl bg-green-600 p-2 rounded "
          onClick={handleClick}
        >
          Submit
        </button>
      </td>
    </tr>
  );
};

export default Collected;
