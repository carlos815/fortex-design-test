import React, { useState, useEffect, createContext, useContext, ReactComponentElement, Dispatch, SetStateAction, use } from "react";
import { fetchGroup, loginUser } from "../api/user";
import Cookies from 'js-cookie'

export const DataContext = createContext<any>(null);


export const getAccessToken = () => Cookies.get('access_token')


export default function UserContextComp({ children }) {
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(true);


  const logIn = async (user: string, password: string) => {
    const response = await loginUser(user, password)
    const result = await response.json()
    if (response.status > 200) throw Error(result)
    Cookies.set("access_token", result.token)
  }


  return (
    <DataContext.Provider value={{ logIn }
    }>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(DataContext);
