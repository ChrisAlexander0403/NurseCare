export const createUserXmls = (id, picture, firstname, lastname, email, password, rol, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:InsertUserPortNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <user xsi:type="xsd:string">${email}</user>
                        <password xsi:type="xsd:string">${password}</password>
                        <rol xsi:type="xsd:int">${rol}</rol>
                        <nombre xsi:type="xsd:string">${firstname + ' ' + lastname}</nombre>
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <imagen xsi:type="xsd:string">${picture}</imagen>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:InsertUserPortNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

//Edit image
/* <imagen xsi:type="xsd:string">${picture}</imagen> */
export const editUserXmls = (id, name, email, password, rol, apikey) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:EditUserPortNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <user xsi:type="xsd:string">${email}</user>
                        <password xsi:type="xsd:string">${password}</password>
                        <rol xsi:type="xsd:int">${rol}</rol>
                        <nombre xsi:type="xsd:string">${name}</nombre>
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:EditUserPortNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

//Falta editar
export const getAllUsersXmls = (id, apikey) => {

    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetUserNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetUserNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const getUserXmls = (id, user, apikey) => {

    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:GetUserByIdNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <iduser xsi:type="xsd:int">${id}</iduser>
                        <id_usuario xsi:type="xsd:int">${user}</id_usuario>
                        <apikey xsi:type="xsd:string">${apikey}</apikey>
                    </demo:GetUserByIdNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

export const deleteUserXmls = (id, user, apikey) => {
    return (
        `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
            <soapenv:Header/>
            <soapenv:Body>
                <demo:RemoveUserPortNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <iduser xsi:type="xsd:int">${id}</iduser>
                    <iduser_del xsi:type="xsd:int">${user}</iduser_del>
                    <apikey xsi:type="xsd:string">${apikey}</apikey>
                </demo:RemoveUserPortNurse>
            </soapenv:Body>
        </soapenv:Envelope>`);
}

export const updateUserStatusXmls = (idUser, user, status, apikey) => {
    return (
        `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
            <soapenv:Header/>
            <soapenv:Body>
                <demo:UpdateStatusUserNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                    <iduser xsi:type="xsd:int">${idUser}</iduser>
                    <usuario xsi:type="xsd:string">${user}</usuario>
                    <id_status xsi:type="xsd:int">${status}</id_status>
                    <apikey xsi:type="xsd:string">${apikey}</apikey>
                </demo:UpdateStatusUserNurse>
            </soapenv:Body>
        </soapenv:Envelope>`);
}