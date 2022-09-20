import React, { useState, createContext, useContext } from "react";
import { fetchGroupsData } from "../api/fetch";
import { Group } from "../types/types";

export const DataContext = createContext<any>(null);

export default function DataContextComp({ children }: any) {
  const [data, setData] = useState<Group[]>();

  // const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    const response = await fetchGroupsData()
    const result = await response.json()

    //This error should be catched by the function calling it
    if (response.status > 200) throw Error(result)
    setData(result.groups)
  }

  return (
    <DataContext.Provider value={{ data, fetchGroups, }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);