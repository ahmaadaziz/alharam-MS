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
        } else {
          if (row.owner.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        }
      });
    } else {
      filtered = table.filter((row) => {
        if (row.name) {
          if (row.room.indexOf(search) > -1) {
            return true;
          } else {
            return false;
          }
        } else {
          if (row.owner.room.indexOf(search) > -1) {
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
