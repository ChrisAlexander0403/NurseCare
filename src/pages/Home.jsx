import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import XMLParser from 'react-xml-parser';
import { selectTheme } from '../features/slices/themeSlice';
import { HomeContainer } from '../styles/HomeStyles';

const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                  <demo:SaludarNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                      <nombre xsi:type="xsd:string">Christian</nombre>
                  </demo:SaludarNurse>
                </soapenv:Body>
              </soapenv:Envelope>`;

const Home = () => {

  let isDark = useSelector(selectTheme);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, { withCredentials: false }, {
          headers: {
            'Content-Type': 'text/xml'
          }
        });
        let xml = new XMLParser().parseFromString(data.data);
        let message = xml.getElementsByTagName('SaludarNurseReturn');
        console.log(message[0].value);
      } catch (err) {
        console.log(err);
      }
    }
    getMessage();
  }, []);
  

  return (
    <HomeContainer isDark={isDark} className="Home">
      
    </HomeContainer>);
};

export default Home;
