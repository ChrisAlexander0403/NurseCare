export const getOrdersXmls = (id, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetServicesSolNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetServicesSolNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

//Yet to add
export const getOrderDetailsXmls = (id, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetServicesSolNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetServicesSolNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const updateOrderXmls = (idUser, idOrder, status, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:UpdateStatusServiceNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${idUser}</iduser>
                        <idservicio xsi:type="xsd:int">${idOrder}</idservicio>
                        <status xsi:type="xsd:string">${status}</status>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:UpdateStatusServiceNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}