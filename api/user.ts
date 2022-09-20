import { group } from "console";
import { builtinModules } from "module";

const base_url = "https://demo-api-work-test.herokuapp.com/"

export const loginUser = (user: string, password: string) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("email", user);
  urlencoded.append("password", password);

  var requestOptions: RequestInit = {
    method: 'POST',
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch(base_url + "login", requestOptions)
}


export const fetchGroup = (sessionToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", sessionToken);

  var requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(base_url + "group", requestOptions)
}

export const createGroup = (sessionToken: string, body: { name: string, description: string }) => {
  //NOT WORKING
  var myHeaders = new Headers();
  myHeaders.append("authorization", sessionToken);

  // const raw = JSON.stringify(body)
  var urlencoded = new URLSearchParams();
  urlencoded.append("name", body.name);
  urlencoded.append("description", body.description);

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',

  };
  return fetch(base_url + "group/create/", requestOptions)
}

export const updateGroup = (sessionToken: string, groupId: string, name: string, description: string) => {
  var myHeaders = new Headers();
  myHeaders.append("authorization", sessionToken);

  var urlencoded = new URLSearchParams();
  urlencoded.append("name", name);
  urlencoded.append("description", description);

  var requestOptions: RequestInit = {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch(base_url + "group/update" + "/?id=" + groupId, requestOptions).then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

export const deleteGroup = (sessionToken: string, groupId: string) => {

  var myHeaders = new Headers();
  myHeaders.append("authorization", sessionToken);

  var urlencoded = new URLSearchParams();

  var requestOptions: RequestInit = {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch(base_url + "group/delete" + "?id=" + groupId, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export const manageGroupRoles = (sessionToken: string, body: {
  groupId: string
  oldValues: string[],
  newValues: string[]
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", sessionToken);


  var urlencoded = new URLSearchParams();
  urlencoded.append("groupId", body.groupId);
  urlencoded.append("oldValues", JSON.stringify(body.oldValues));
  urlencoded.append("newValues", JSON.stringify(body.newValues));


  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch(base_url + "group/manage-roles", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export const manageGroupMembers = (sessionToken: string, body: {
  groupId: string
  oldValues: string[],
  newValues: string[]
}) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", sessionToken);

  var urlencoded = new URLSearchParams();
  urlencoded.append("groupId", body.groupId);
  urlencoded.append("oldValues", JSON.stringify(body.oldValues));
  urlencoded.append("newValues", JSON.stringify(body.newValues));



  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch(base_url + "group/manage-members", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

