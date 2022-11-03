const MeterTable = ({ rooms }) => {
  return (
    <table className=" border-collapse border-2 border-black ">
      <thead>
        <tr>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Room Number
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Wapda
          </th>
          <th className="border-collapse border-2 border-black text-left p-2 text-2xl">
            Ups
          </th>
        </tr>
      </thead>
      {rooms.length === 0 ? (
        <thead>
          <tr className=" text-center ">
            <th colSpan={20} className="text-4xl">
              No data Available!
            </th>
          </tr>
        </thead>
      ) : (
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td className="border-collapse border-2 border-black text-2xl text-center">
                {room.number}
              </td>
              <td className="border-collapse border-2 border-black text-center w-fit">
                <input
                  name="ups"
                  id={room.number}
                  type={"number"}
                  className="text-black w-full text-2xl"
                  required
                />
              </td>
              <td className="border-collapse border-2 border-black text-center w-fit">
                <input
                  name="wapda"
                  id={room.number}
                  type={"number"}
                  className="text-black w-full text-2xl"
                  required
                />
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default MeterTable;
