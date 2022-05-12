/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useForm from '../hooks/useForm';
import useFormatDate from '../hooks/useFormatDate';
import useImageV2 from '../hooks/useImageV2';
import useModal from '../hooks/useModal';
import useXMLRequest from '../hooks/useXMLRequest';
import { ClientContainer } from '../styles/ClientStyles';
import editClientValidate from '../utils/validations/editClientValidate';
import { getClientXmls, updateClientStatusXmls } from '../XMLRequests/clientRequests';
import useWindowsDimensions from '../hooks/useWindowsDimensions';

const Client = () => {

    const [client, setClient] = useState();
    const [editMode, setEditMode] = useState(false);
    const [values, setValues] = useState({});
    const [device, setDevice] = useState('');

    const navigate = useNavigate();
    let { id } = useParams();
    let session = useSelector(selectSession);
    let isDark = useSelector(selectTheme);
    const image = useImageV2();
    const formatDate = useFormatDate();
    const request = useXMLRequest();
    let { height, width } = useWindowsDimensions();

    const [isOpen, openModal, closeModal] = useModal(true, navigate);

    const handleBlocking = async (status) => {
        let xmls = updateClientStatusXmls(session.id, id, status, session.apikey);
        let response = await request(xmls, 'UpdateStatusClientNurseReturn');
        if (response.status === 'success') {
            xmls = getClientXmls(session.id, id, session.apikey);
            response = await request(xmls, 'GetClientbyIdNurseReturn')
            setClient(response.datos[0]);
        }
    }

    const handleDeleteClient = () => {

    }

    const handleEditClient = () => {

    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, handleEditClient, editClientValidate);

    useEffect(() => {
        (async () => {
            let xmls = getClientXmls(session.id, id, session.apikey);
            let response = await request(xmls, 'GetClientbyIdNurseReturn')
            setClient(response.datos[0]);
        })();
        //eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        // (() => {
        //   const ua = navigator.userAgent;
        //   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        //     setDevice("tablet");
        //   }
        //   if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
        //   ) {
        //     setDevice("mobile");
        //   }
        //   setDevice("desktop");
        // })();
        if (width <= 480) {
          setDevice('mobile');
        }
    }, [width]);

    return (
        <>
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            type='close'
            background={isDark ? '#181818' : '#EEE'}
            color='#417493'
            minWidth={device === 'mobile' ? '100%' : '460px'}
        >
            {
                client &&
                <ClientContainer>
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
                <form onSubmit={handleSubmit} className="user-info-container">
                    <p className="name">{client.nombre}</p>
                    <p className="date">Se unió el {formatDate(client.fechaCreacion).completeDate}</p>
                    <div className="content-line">
                        <p className="birthdate">Fecha de nacimiento: </p>
                        <p>{formatDate(client.fechaNacimineto).completeDate}</p>
                    </div>
                    <div className="content-line">
                        <label htmlFor="address">Dirección</label>
                        {
                            editMode 
                            ? <input 
                                type="text" 
                                name="address" 
                                id="address"
                                placeholder="Dirección" 
                                value={values.address}
                                onChange={handleChange}
                            />
                            : <p>{client.direccion}</p>
                        }
                    </div>
                    <div className="content-line">
                        <label htmlFor="email">Correo</label>
                        {
                            editMode 
                            ? <input 
                                type="text" 
                                name="email" 
                                id="email"
                                placeholder="Correo" 
                                value={values.email}
                                onChange={handleChange}
                            />
                            : <p>{client.email}</p>
                        }
                    </div>
                    <div className="content-line">
                        <label htmlFor="phone">Celular</label>
                        {
                            editMode 
                            ? <input 
                                type="text" 
                                name="phone" 
                                id="phone"
                                placeholder="Celular" 
                                value={values.phone}
                                onChange={handleChange}
                            />
                            : <p>{client.telefono}</p>
                        }
                    </div>
                    <div className="content-line">
                        <label htmlFor="password">Contraseña</label>
                        {
                            editMode 
                            ? <input 
                                type="text" 
                                name="password" 
                                id="password"
                                placeholder="Contraseña" 
                                value={values.password}
                                onChange={handleChange}
                            />
                            : <p>{client.password}</p>
                        }
                    </div>
                    <div className="content-line">
                        <p>Status</p>
                        <p>{
                            client.status === '0'
                            ? 'Deshabilitado'
                            : 'Habilitado'

                        }</p>
                    </div>
                </form>
                </div>
                <div className="buttons">
                {
                    client.status === '1' ?
                    <button className="edit" onClick={() => handleBlocking(0)}>Deshabilitar</button> 
                    : <button className="edit" onClick={() => handleBlocking(1)}>Habilitar</button>
                }
                <button className="delete" onClick={() => handleDeleteClient()}>Eliminar</button>
                {/* <button className="edit" onClick={() => setEditMode(true)}>Editar</button> */}
                </div>
                </ClientContainer>
            }
        </Modal>
        </>
    );
}

export default Client;