import axios from "axios";
import XMLParser from 'react-xml-parser';
import { getClientsXmls, getClientXmls, updateClientStatusXmls } from "../XMLRequests/clientRequests";

export const getClient = async (idUser, idClient, apiKey) => {
    let xmls = getClientXmls(idUser, idClient, apiKey);
    try {
        const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
        {withCredentials:false}, {
          headers: {
            'Content-Type': 'text/xml'
          }
        });
        let xml = new XMLParser().parseFromString(data.data);
        let GetClient = xml.getElementsByTagName('GetClientbyIdNurseReturn');
        let response = JSON.parse(GetClient[0].value);
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const getClientsRequest = async (id, apikey) => {
  let xmls = getClientsXmls(id, apikey);
  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetClients = xml.getElementsByTagName('GetClientNurseReturn');
    let response = JSON.parse(GetClients[0].value);
    return response;
  } catch(error) {
    console.log(error);
  } 
}

export const updateClientStatusRequest = async (idUser, idClient, status, apikey) => {
  let xmls = updateClientStatusXmls(idUser, idClient, status, apikey);
  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let updateStatusClient = xml.getElementsByTagName('UpdateStatusClientNurseReturn');
    let response = JSON.parse(updateStatusClient[0].value);
    return response;
  } catch(error) {
    console.log(error);
  } 
}