export const getCatalogsXmls = (id, apikey) => {

    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetCategosNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:string">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetCategosNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const createCatalogXmls = (id, name, image, apikey) => {

    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:InsertCategoNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <nombreCatego xsi:type="xsd:string">${name}</nombreCatego>
                        <imagen xsi:type="xsd:string">${image}</imagen>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:InsertCategoNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
  }

export const deleteCategoryXmls = (id, idCategory, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:RemoveCategoPortNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser_del xsi:type="xsd:int">${id}</iduser_del>
                        <idcatego xsi:type="xsd:int">${idCategory}</idcatego>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:RemoveCategoPortNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}