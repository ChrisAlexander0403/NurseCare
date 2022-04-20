import axios from "axios";
import XMLParser from 'react-xml-parser';
import { updateUserStatusXmls, createUserXmls, deleteUserXmls, getAllUsersXmls, getUserXmls } from "../XMLRequests/userRequests";

export const getUsersRequest = async (userId, apikey) => {

  let xmls = getAllUsersXmls(userId, apikey);

  try {
    let data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetUsers = xml.getElementsByTagName('GetUserNurseReturn');
    let response = JSON.parse(GetUsers[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const getUserRequest = async (userId, user, apikey) => {

  let xmls = getUserXmls(userId, user, apikey);

  try {
    let data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetUser = xml.getElementsByTagName('GetUserByIdNurseReturn');
    let response = JSON.parse(GetUser[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const deleteUserRequest = async (userId, user, apikey) => {

  let xmls = deleteUserXmls(userId, user, apikey);

  try {
    let data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let removeUser = xml.getElementsByTagName('RemoveUserPortNurseReturn');
    let response = JSON.parse(removeUser[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const createUserRequest = async (userId, picture, firstname, lastname, email, password, rol, apikey) => {    
  let xmls = createUserXmls(userId, picture, firstname, lastname, email, password, rol, apikey);
  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', 
      xmls, { withCredentials: false }, {
        headers: {
            'Content-Type': 'text/xml'
        }
    });
    let xml = new XMLParser().parseFromString(data.data);
    let tag = xml.getElementsByTagName('InsertUserPortNurseReturn');
    let response = JSON.parse(tag[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const updateUserStatusRequest = async (idUser, user, status, apikey) => {
  let xmls = updateUserStatusXmls(idUser, user, status, apikey);
  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', 
      xmls, { withCredentials: false }, {
        headers: {
            'Content-Type': 'text/xml'
        }
    });
    let xml = new XMLParser().parseFromString(data.data);
    let updateUserStatus = xml.getElementsByTagName('UpdateStatusUserNurseReturn');
    let response = JSON.parse(updateUserStatus[0].value);
    console.log(response);
    return response;
  } catch(error) {
    console.log(error);
  }
}