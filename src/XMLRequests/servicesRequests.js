export const getServicesXmls = (id, idcategory, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetServicesNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <idcategoria xsi:type="xsd:int">${idcategory}</idcategoria>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetServicesNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const getServiceXmls = (id, idservice, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetServiceByIdNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <idservice xsi:type="xsd:int">${idservice}</idservice>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetServiceByIdNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const createServiceXmls = (id, idCategory, description, title, price, img, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:InsertServiceNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <idcatego xsi:type="xsd:string">${idCategory}</idcatego>
                        <descripcion xsi:type="xsd:string">${description}</descripcion>
                        <nombre xsi:type="xsd:string">${title}</nombre>
                        <costo xsi:type="xsd:float">${price}</costo>
                        <imagen xsi:type="xsd:string">${img}</imagen>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:InsertServiceNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}