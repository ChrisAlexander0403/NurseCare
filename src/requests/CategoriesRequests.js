import axios from "axios";
import XMLParser from 'react-xml-parser';
import { createCatalogXmls, deleteCategoryXmls, getCatalogsXmls } from "../XMLRequests/catalogsRequests";


export const getCategories = async (id, apikey) => {
    
    let xmls = getCatalogsXmls(id, apikey);

    try {
    const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
    {withCredentials:false}, {
        headers: {
        'Content-Type': 'text/xml'
        }, 
    });
    let xml = new XMLParser().parseFromString(data.data);
    let GetCatalogs = xml.getElementsByTagName('GetCategosNurseReturn');
    let response = JSON.parse(GetCatalogs[0].value);
    return response;
    } catch(error) {
    console.log(error);
    }
}

export const createCategory = async (idUser, name, image, apiKey) => {
    let xmls = createCatalogXmls(idUser, name, image, apiKey);
    try {
        const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
        {withCredentials:false}, {
          headers: {
            'Content-Type': 'text/xml'
          }
        });
        let xml = new XMLParser().parseFromString(data.data);
        let GetCategory = xml.getElementsByTagName('InsertCategoNurseReturn');
        let response = JSON.parse(GetCategory[0].value);
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const deleteCategoryRequest = async (id, idCategory, apikey) => {
    let xmls = deleteCategoryXmls(id, idCategory, apikey);
    try {
        const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
        {withCredentials:false}, {
          headers: {
            'Content-Type': 'text/xml'
          }
        });
        let xml = new XMLParser().parseFromString(data.data);
        let GetCategory = xml.getElementsByTagName('RemoveCategoPortNurseReturn');
        console.log(GetCategory[0].value)
        let response = JSON.parse(GetCategory[0].value);
        return response;
    } catch(error) {
        console.log(error);
    }
}