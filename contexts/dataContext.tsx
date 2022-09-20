import React, { useState, createContext, useContext} from "react";
import { fetchGroupsData } from "../api/fetch";
import { Group } from "../types/types";



export const DataContext = createContext<any>(null);


export default function DataContextComp({ children }: any) {
  const [user, setUser] = useState("");
  const [data, setData] = useState<Group[]>();

  const [loading, setLoading] = useState(true);

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

// Custom hook that shorthands the context!
export const useData = () => useContext(DataContext);


// //Helper fetch functions
// export const _loginUser = (user: string, password: string) => {
//   var urlencoded = new URLSearchParams();
//   urlencoded.append("email", user);
//   urlencoded.append("password", password);

//   var requestOptions: RequestInit = {
//     method: 'POST',
//     body: urlencoded,
//     redirect: 'follow'
//   };

//   return fetch(base_url + "login", requestOptions)
// }

// export const _fetchGroup = (sessionToken: string) => {
//   var myHeaders = new Headers();
//   myHeaders.append("authorization", sessionToken);

//   var requestOptions: RequestInit = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//   };

//   return fetch(base_url + "group", requestOptions)
// }

// export const _createGroup = (sessionToken: string, body: { name: string, description: string }) => {
//   //NOT WORKING
//   var myHeaders = new Headers();
//   myHeaders.append("authorization", sessionToken);

//   // const raw = JSON.stringify(body)
//   var urlencoded = new URLSearchParams();
//   urlencoded.append("name", body.name);
//   urlencoded.append("description", body.description);

//   var requestOptions: RequestInit = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow',

//   };
//   return fetch(base_url + "group/create/", requestOptions)
// }

// export const _updateGroup = (sessionToken: string, groupId: string, name: string, description: string) => {
//   var myHeaders = new Headers();
//   myHeaders.append("authorization", sessionToken);

//   var urlencoded = new URLSearchParams();
//   urlencoded.append("name", name);
//   urlencoded.append("description", description);

//   var requestOptions: RequestInit = {
//     method: 'PATCH',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//   };

//   return fetch(base_url + "group/update" + "/?id=" + groupId, requestOptions)

// }

// export const _deleteGroup = (sessionToken: string, groupId: string) => {

//   var myHeaders = new Headers();
//   myHeaders.append("authorization", sessionToken);

//   var urlencoded = new URLSearchParams();

//   var requestOptions: RequestInit = {
//     method: 'DELETE',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//   };

//   return fetch(base_url + "group/delete" + "?id=" + groupId, requestOptions)

// }

// export const _manageGroupRoles = (sessionToken: string, body: {
//   groupId: string
//   oldValues: string[],
//   newValues: string[]
// }) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", sessionToken);


//   var urlencoded = new URLSearchParams();
//   urlencoded.append("groupId", body.groupId);
//   urlencoded.append("oldValues", JSON.stringify(body.oldValues));
//   urlencoded.append("newValues", JSON.stringify(body.newValues));


//   var requestOptions: RequestInit = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//   };

//   return fetch(base_url + "group/manage-roles", requestOptions)

// }

// export const _manageGroupMembers = (sessionToken: string, body: {
//   groupId: string
//   oldValues: string[],
//   newValues: string[]
// }) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Authorization", sessionToken);

//   var urlencoded = new URLSearchParams();
//   urlencoded.append("groupId", body.groupId);
//   urlencoded.append("oldValues", JSON.stringify(body.oldValues));
//   urlencoded.append("newValues", JSON.stringify(body.newValues));



//   var requestOptions: RequestInit = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//   };

//   return fetch(base_url + "group/manage-members", requestOptions)

// }

