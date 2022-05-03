export const getClientsXmls = (idUser, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:getClientNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${idUser}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:getClientNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const getClientXmls = (idUser, idClient, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:getClientbyIdNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <idclient xsi:type="xsd:int">${idClient}</idclient>
                        <iduser xsi:type="xsd:int">${idUser}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:getClientbyIdNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const updateClientStatusXmls = (idUser, idClient, status, apikey) => {
    return (`
        <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
            <soapenv:Header/>
            <soapenv:Body>
                <demo:UpdateStatusClientNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <idclient xsi:type="xsd:int">${idClient}</idclient>
                    <status xsi:type="xsd:int">${status}</status>
                    <iduser xsi:type="xsd:int">${idUser}</iduser>
                    <apikey xsi:type="xsd:string">${apikey}</apikey>
                </demo:UpdateStatusClientNurse>
            </soapenv:Body>
        </soapenv:Envelope>
    `);
}