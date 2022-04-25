import axios from "axios";
import XMLParser from 'react-xml-parser';
import { getOrderDetailsXmls, getOrdersXmls, updateOrderXmls } from "../XMLRequests/ordersRequests";


export const getOrdersRequest = async (userId, apikey) => {
  
  let xmls = getOrdersXmls(userId, apikey);

  try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', 
      xmls, {withCredentials:false}, {
      headers: {
        'Content-Type': 'text/xml'
      }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetOrders = xml.getElementsByTagName('GetServicesSolNurseReturn');
    let response = JSON.parse(GetOrders[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}   

export const getOrderDetailsRequest = async (id, idOrder, apikey) => {

  let xmls = getOrderDetailsXmls(id, idOrder, apikey);

  try {
      const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
      {withCredentials:false}, {
        headers: {
          'Content-Type': 'text/xml'
        }, 
      });
    let xml = new XMLParser().parseFromString(data.data);
    let GetOrders = xml.getElementsByTagName('GetServSolbyIdNurseReturn');
    let response = JSON.parse(GetOrders[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}

export const updateOrderRequest = async (idUser, idOrder, status, apikey) => {

  let xmls = updateOrderXmls(idUser, idOrder, status, apikey);

  try {
      const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
      {withCredentials:false}, {
        headers: {
          'Content-Type': 'text/xml'
        }, 
      });
    let xml = new XMLParser().parseFromString(data.data);
    let GetOrders = xml.getElementsByTagName('UpdateStatusServiceNurseReturn');
    let response = JSON.parse(GetOrders[0].value);
    return response;
  } catch(error) {
    console.log(error);
  }
}