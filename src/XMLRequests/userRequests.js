export const createUserXmls = (id, firstname, lastname, email, password, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:InsertUserPortNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <user xsi:type="xsd:string">${email}</user>
                        <password xsi:type="xsd:string">${password}</password>
                        <rol xsi:type="xsd:int">${1}</rol>
                        <nombre xsi:type="xsd:string">${firstname + ' ' + lastname}</nombre>
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:InsertUserPortNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

//Falta editar
export const getAllUsersXmls = (id, firstname, lastname, email, password, apikey) => {

    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:InsertUserPortNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <user xsi:type="xsd:string">${email}</user>
                        <password xsi:type="xsd:string">${password}</password>
                        <rol xsi:type="xsd:int">${1}</rol>
                        <nombre xsi:type="xsd:string">${firstname + ' ' + lastname}</nombre>
                        <iduser xsi:type="xsd:string">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:InsertUserPortNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
  }