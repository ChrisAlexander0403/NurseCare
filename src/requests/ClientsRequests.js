import axios from "axios";
import XMLParser from 'react-xml-parser';
import { getClientXmls } from "../XMLRequests/clientRequests";

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
        return response.datos[0];
    } catch(error) {
        console.log(error);
    }
}