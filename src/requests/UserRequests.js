import axios from "axios";
import XMLParser from 'react-xml-parser';
import { getAllUsersXmls } from "../XMLRequests/userRequests";

export const getUsersRequest = async (userId, categoryId, apikey) => {

    let xmls = getAllUsersXmls(userId, categoryId, apikey);
  
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