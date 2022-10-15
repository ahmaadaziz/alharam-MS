import { useState } from "react";
import Table from "../Table/Table";
import axios from "axios";
import useSearch from "../../Hooks/useSearch";
const dayjs = require("dayjs");

const TableContainer = ({ table, render }) => {
  const [search, setSearch] = useState("");
  const filtered = useSearch(table, search);

  const HandleSubmit = (e) => {
    e.preventDefault();
    let values = [];
    for (
      let index = 0;
      index < e.target.elements.length - 1;
      index = index + 3
    ) {
      values.push({
        id: e.target.elements[index].id,
        rid: e.target.elements[index].attributes.rid.value,
        ups: +e.target.elements[index].value,
        wapda: +e.target.elements[index + 1].value,
        attendance: +e.target.elements[index + 2].value,
      });
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}residents/calculateBill`,
        { values: values },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      )
      .then(() => {
        render((current) => !current);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" mt-4 ">
      <div className=" text-5xl text-center ">
        {table[0]?.createdAt
          ? dayjs(table[0]?.createdAt).add(1, "month").format("MMMM")
          : "Previous Records"}
      </div>
      {table.length > 0 ? (
        <div className=" flex flex-col justify-center items-start ml-2 mb-2">
          <label htmlFor="resident" className="text-2xl mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Name or Room Number"
            id="resident"
            value={search}
            className="w-fit text-xl text-black"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      ) : null}
      <div className="border-b-2 border-black">
        <form
          onSubmit={HandleSubmit}
          className="flex flex-col mt-4 overflow-x-auto mb-5"
        >
          <Table data={filtered} render={render} />
          {table.length > 0 && !table[0].totalBill ? (
            <input
              type={"submit"}
              value={"Calculate"}
              className=" m-2 p-3 bg-slate-700 uppercase text-2xl rounded cursor-pointer "
            />
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default TableContainer;
