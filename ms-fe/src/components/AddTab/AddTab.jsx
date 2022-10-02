import { useState } from "react";
import axios from "axios";

const AddTab = ({ id }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}tabs`,
        {
          title,
          amount,
          owner: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          window.alert("Added");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form
      className="flex flex-col justify-center items-center m-10"
      onSubmit={HandleSubmit}
    >
      <label htmlFor="title">Title</label>
      <input
        className="text-black text-2xl"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="amount">Amount</label>
      <input
        className="text-black text-2xl"
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
      />
      <input
        className="px-5 py-2 text-2xl border-2 bg-black text-white uppercase mr-5 cursor-pointer m-2 "
        type="submit"
        value="Create"
      />
    </form>
  );
};

export default AddTab;
