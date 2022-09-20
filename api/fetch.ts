import { group } from "console";
import { builtinModules } from "module";
import Cookies from 'js-cookie'

const base_url = "https://demo-api-work-test.herokuapp.com/"

export const getAccessToken = () => Cookies.get('access_token')
export const deleteAccessToken = () => Cookies.remove('access_token')

export const logIn = async (user: string, password: string) => {

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", user);
    urlencoded.append("password", password);

    var requestOptions: RequestInit = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch(base_url + "login", requestOptions)
    if (response.status > 200) throw Error(await response.text())

    const result = await response.json()
    Cookies.set("access_token", result.token)
}

export const fetchGroupsData = () => {
    var myHeaders = new Headers();
    myHeaders.append("authorization", getAccessToken());

    var requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(base_url + "group", requestOptions)
}

export const createGroup = async (body: { name: string, description: string }) => {
    var myHeaders = new Headers();
    myHeaders.append("authorization", getAccessToken());

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

    const response = await fetch(base_url + "group/create/", requestOptions)
    const result = await response.json()

    //This error should be catched by the function calling it
    if (response.status > 200) throw Error(result)
}

export const deleteGroup = async (groupId: string) => {

    var myHeaders = new Headers();
    myHeaders.append("authorization", getAccessToken());

    var urlencoded = new URLSearchParams();

    var requestOptions: RequestInit = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    const response = await fetch(base_url + "group/delete" + "?id=" + groupId, requestOptions)
    const result = await response.json()

    if (response.status > 200) throw Error(result)
}

export const updateGroup = async (groupId: string, name: string, description: string) => {
    var myHeaders = new Headers();
    myHeaders.append("authorization", getAccessToken());

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("description", description);

    var requestOptions: RequestInit = {
        method: 'PATCH',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch(base_url + "group/update" + "/?id=" + groupId, requestOptions)
    const result = await response.json()

    if (response.status > 200) throw Error(result)
}

export const manageGroupMembers = async (body: {
    groupId: string
    oldValues: string[],
    newValues: string[]
}) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getAccessToken());

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

    const response = await fetch(base_url + "group/manage-members", requestOptions)

    const result = await response.json()

    if (response.status > 200) throw Error(result)
}

export const manageGroupRoles = async (body: {
    groupId: string
    oldValues: string[],
    newValues: string[]
}) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getAccessToken());

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

    const response = await fetch(base_url + "group/manage-roles", requestOptions)
    const result = await response.json()
    if (response.status > 200) throw Error(result)
}
