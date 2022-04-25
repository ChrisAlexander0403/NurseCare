import React, { useEffect, useState } from 'react';
import { ClientsContainer } from '../styles/ClientsStyles';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import useImageV2 from '../hooks/useImageV2';
import { getClientsXmls } from '../XMLRequests/clientRequests';
import { getClient } from '../requests/ClientsRequests';
import { selectSession } from '../features/slices/sessionSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { selectTheme } from '../features/slices/themeSlice';
import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';
import { CloseSession } from '../styles/SettingsStyles';

const Clients = () => {

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState();

  let image = useImageV2();
  const [isOpen, openModal, closeModal] = useModal();

  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);

  const handleGetClient = async (idClient) => {
    let response = await getClient(session.id, idClient, session.apikey)
    setClient(response.datos[0]);
  }

  const handleBlocking = () => {
    closeModal();
  }

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
  }, []);

  return (
    <>
    <Modal
        isOpen={isOpen}
        type={'closing'}
        important={false}
        background={isDark ? '#181818' : '#EEE'}
        maxHeight='140px'
        minHeight='140px'
    >
        <CloseSession>
            <div className="info"><p>¿Seguro que deseas bloquaer a este cliente?</p></div>
            <div className="buttons">
                <button onClick={handleBlocking}>Bloquear</button>
                <button className='cancel' onClick={closeModal}>Cancelar</button>
            </div>
        </CloseSession>
    </Modal>
    <ClientsContainer isDark={isDark}>
      <h1>Clientes</h1>
      <div className="main-container">
        <div className="container-box">
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
                  <button onClick={() => handleGetClient(client.idUser)}>Detalles <HiOutlineArrowNarrowRight /></button>
                </div>
              )
            })}
          </div>
        </div>
        {client && (
          <div className="container-box">
          <div className="image-container">
            <img 
              style={{ 
                "objectFit": !image(`http://thenursecare.com/Demo/${client.imagen}`).exists 
                ? "contain" : "cover"
              }} 
              src={image(`http://thenursecare.com/Demo/${client.imagen}`).img} 
              alt="Profile" 
            />
          </div>
            <div className="user-container">
              <div className="user-info-container">
                <p className="name">{client.nombre}</p>
                <p className="date">Se unió el {client.fechaCreacion.slice(0, 10)}</p>
                <p className="birthdate">Fecha de nacimiento: {client.fechaNacimineto.slice(0,10)}</p>
                <p className="address">{client.direccion}</p>
                <p className="email">{client.email}</p>
                <p className="phone">{client.telefono}</p>
              </div>
            </div>
            <div className="buttons">
              <button className="edit">Editar</button>
              <button className="delete" onClick={openModal}>Bloquear</button>
              <button className="delete">Eliminar</button>
            </div>
          </div>
        )}
      </div>
    </ClientsContainer>
    </>
  );
}

export default Clients;