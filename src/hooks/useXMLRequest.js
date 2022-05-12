import axios from "axios";
import XMLParser from 'react-xml-parser';

const useXMLRequest = () => {
    return async (xmls, label) => {
        let response;
        try {
            const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
            {withCredentials:false}, {
                headers: {
                    'Content-Type': 'text/xml'
                }, 
            });
            let xml = new XMLParser().parseFromString(data.data);
            let getData = xml.getElementsByTagName(label);
            response = JSON.parse(getData[0].value);
        } catch(error) {
            response = { error: error, message: "Something went wrong" };
        }

        return response;
    }
}

export default useXMLRequest;