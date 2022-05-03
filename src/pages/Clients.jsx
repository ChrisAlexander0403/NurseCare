import React, { useEffect, useState } from 'react';
import { ClientsContainer } from '../styles/ClientsStyles';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getClientsXmls } from '../XMLRequests/clientRequests';
import { selectSession } from '../features/slices/sessionSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { selectTheme } from '../features/slices/themeSlice';

const Clients = () => {

  const [clients, setClients] = useState([]);


  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {

    let xmls = getClientsXmls(session.id, session.apikey);

    const getClients = async () => {
      try {
        const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', xmls, 
        {withCredentials:false}, {
          headers: {
            'Content-Type': 'text/xml'
          }, 
        });
        let xml = new XMLParser().parseFromString(data.data);
        let GetClients = xml.getElementsByTagName('GetClientNurseReturn');
        let response = JSON.parse(GetClients[0].value);
        console.log(response.datos)
        setClients(response.datos);
      } catch(error) {
        console.log(error);
      }
    }
    
    getClients();
    
    console.log(clients);
    //eslint-disable-next-line
  }, [location]);

  return (
    <>
    <ClientsContainer isDark={isDark}>
      <h1>Clientes</h1>
      <div className="main-container">
          <div className="clients">
            {clients.map((client) => {
              return (
                <div className="client" key={client.idUser}>
                  <div className="client-header">
                    <p className="name">{client.nombre}</p>
                    <p className="date">{client.fechaCreacion.slice(0, 10)}</p>
                  </div>
                  <div className="client-body">
                    <p className="address">{client.direccion}</p>
                  </div>
                  <p className={client.status === 0 ? "status blocked" : "status"}>{
                    client.status === '0' 
                      ? 'Bloqueado'
                      : client.status === '1' && 'Activo' 
                  }</p>
                  <button onClick={() => navigate(client.idUser)}>Detalles <HiOutlineArrowNarrowRight /></button>
                </div>
              )
            })}
          </div>
      </div>
    </ClientsContainer>
    <Outlet />
    </>
  );
}

export default Clients;