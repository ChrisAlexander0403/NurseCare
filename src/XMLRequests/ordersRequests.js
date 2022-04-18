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