import { useMemo, useState } from "react";

export default function useSearch(table, search) {
  const [filteredTable, setFilteredTable] = useState([]);
  useMemo(() => {
    var filtered = [];
    if (!isFinite(search)) {
      filtered = table.filter((row) => {
        if (row.name) {
          if (row.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        } else if (row.owner) {
          if (row.owner.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            row.residents.findIndex(
              (resident) =>
                resident.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            ) === -1
          ) {
            return false;
          } else {
            return true;
          }
        }
      });
    } else {
      filtered = table.filter((row) => {
        if (row.name) {
          if (row.room.number.toString().indexOf(search) > -1) {
            return true;
          } else {
            return false;
          }
        } else if (row.owner) {
          if (row.owner.room.number.toString().indexOf(search) > -1) {
            return true;
          } else {
            return false;
          }
        } else {
          if (row.number.toString().indexOf(search) > -1) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    setFilteredTable(filtered);
  }, [search, table]);
  return filteredTable;
}
