import axios from "axios";
import XMLParser from 'react-xml-parser';
import { createServiceXmls, deleteServiceXmls, getServicesXmls, getServiceXmls } from "../XMLRequests/servicesRequests";

export const getServicesRequest = async (userId, categoryId, apikey) => {

  let xmls = getServicesXmls(userId, categoryId, apikey);

  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetServices = xml.getElementsByTagName('GetServicesNurseReturn');
    let response = JSON.parse(GetServices[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const getServiceRequest = async (userId, idService, apikey) => {

  let xmls = getServiceXmls(userId, idService, apikey);

  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetService = xml.getElementsByTagName('GetServiceByIdNurseReturn');
    let response = JSON.parse(GetService[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const createServiceRequest = async (userId, categoryId, description, title, price, icon, apikey) => {
  let xmls = createServiceXmls(userId, categoryId, description, title, price, icon, apikey);
  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetServices = xml.getElementsByTagName('InsertServiceNurseReturn');
    let response = JSON.parse(GetServices[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const deleteServiceRequest = async (userId, serviceId, apikey) => {
  let xmls = deleteServiceXmls(userId, serviceId, apikey);
  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let removeService = xml.getElementsByTagName('RemoveServicioPortNurseReturn');
    let response = JSON.parse(removeService[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}