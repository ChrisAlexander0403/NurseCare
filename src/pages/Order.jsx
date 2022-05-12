import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import numeral from 'numeral';
import Modal from '../components/modal/Modal';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import { OrderContainer } from '../styles/OrderStyles';
import useImageV2 from '../hooks/useImageV2';
import { selectSession } from '../features/slices/sessionSlice';
import useFormatDate from '../hooks/useFormatDate';
import useXMLRequest from '../hooks/useXMLRequest';
import { getOrderDetailsXmls, updateOrderXmls } from '../XMLRequests/ordersRequests';
import { getClientXmls } from '../XMLRequests/clientRequests';
import { getServiceXmls } from '../XMLRequests/servicesRequests';

const Order = () => {

    const [order, setOrder] = useState();
    const [client, setClient] = useState();
    const [service, setService] = useState();

    const { id } = useParams();
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [isOpen, openModal, closeModal] = useModal(true, navigate);
    let isDark = useSelector(selectTheme);
    let session = useSelector(selectSession);
    const image = useImageV2();
    const image2 = useImageV2();
    const formatDate = useFormatDate();
    const request = useXMLRequest();

    const handleChangeOrderStatus = async (status) => {
        let xmls = updateOrderXmls(session.id, order.idServiceSol, status, session.apikey);
        let response = await request(xmls, 'UpdateStatusServiceNurseReturn');
        if(response.status === 'success') {
            xmls = getOrderDetailsXmls(session.id, id, session.apikey);
            let orderResponse = await request(xmls, 'GetServSolbyIdNurseReturn');
            if(orderResponse.status === 'success') {
                setOrder(orderResponse.datos[0]);
                // let clientResponse;
                // let serviceResponse;
            //     xmls = getClientXmls(session.id, orderResponse.datos[0].idCliente, session.apiKey);
            //     clientResponse = await request(xmls, 'GetClientbyIdNurseReturn');
            //     setClient(clientResponse.datos[0]);
            //     xmls = getServiceXmls(session.id, orderResponse.datos[0].idServicio, session.apikey);
            //     serviceResponse = await request(xmls, 'GetServiceByIdNurseReturn');
            //     setService(serviceResponse.datos[0]);
            }
        }
    }

    useEffect(() => {
        (async () => {
            let xmls = getOrderDetailsXmls(session.id, id, session.apikey);
            let orderResponse = await request(xmls, 'GetServSolbyIdNurseReturn');
            if(orderResponse.status === 'success') {
                let clientResponse;
                let serviceResponse;
                setOrder(orderResponse.datos[0]);
                xmls = getClientXmls(session.id, orderResponse.datos[0].idCliente, session.apikey);
                clientResponse = await request(xmls, 'GetClientbyIdNurseReturn');
                setClient(clientResponse.datos[0]);
                xmls = getServiceXmls(session.id, orderResponse.datos[0].idServicio, session.apikey);
                serviceResponse = await request(xmls, 'GetServiceByIdNurseReturn');
                console.log(serviceResponse);
                setService(serviceResponse.datos[0]);
            }
        })();
    });

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            type='close'
            background={isDark ? '#181818' : '#EEE'}
            color='#417493'
            minWidth='460px'
        >
            {
                order && client && service &&
                <OrderContainer isDark={isDark}>
                    <div className="order">
                        <div className="img-container">
                            <img src={image(`http://thenursecare.com/Demo/${service.imagen}`).img} alt="" />
                        </div>
                        <div className="header">{service.nombre}</div>
                        <div className="body">
                            <div className="service">
                                <p>{numeral(service.costo).format('$0.00')}</p>
                                <p>{service.descripcion}</p>
                                <p><span>Para:</span> {
                                    order.fechaSolServ.length > 2
                                    ? formatDate(order.fechaSolServ.slice(0,10)).compressedDate + ' a las ' + order.fechaSolServ.slice(11,16)
                                    : 'No hay fecha definida'
                                }</p>
                                <p><span>Comentarios:</span> <br/>{
                                    order.cometario.length > 1
                                    ? order.cometario
                                    : 'No hay comentarios'
                                }</p>
                            </div>
                            <div className="client">
                                <div className="img-container">
                                    <img src={image2(`http://thenursecare.com/Demo/${client.imagen}`).img}  alt="" />
                                </div>
                                <div className="content">
                                    <div className="content-line">
                                    <p><span>Cliente: </span>{client.nombre}</p>                
                                    </div>
                                    <div className="content-line">
                                    <p><span>Dirección: </span>{client.direccion}</p>
                                    </div>
                                    <div className="content-line">
                                    <p><span>Teléfono: </span>{client.telefono}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="options">
                                { order.status === 'Recibido' ? 
                                <><button 
                                    className="accept" 
                                    onClick={() => handleChangeOrderStatus('Aceptado')} 
                                >Aceptar</button>
                                <button 
                                    className="reject" 
                                    onClick={() => handleChangeOrderStatus('Rechazado')} 
                                >Rechazar</button></> : order.status === 'Aceptado' ?
                                <><button 
                                    className="accept" 
                                    onClick={() => handleChangeOrderStatus('En curso')} 
                                >Iniciar</button>
                                <button 
                                    className="reject" 
                                    onClick={() => handleChangeOrderStatus('Cancelado')} 
                                >Cancelar</button></> : order.status === 'En curso' &&
                                <><button 
                                    className="accept" 
                                    onClick={() => handleChangeOrderStatus('Terminado')} 
                                >Terminar</button>
                                <button 
                                    className="reject" 
                                    onClick={() => handleChangeOrderStatus('Cancelado')} 
                                >Cancelar</button></>
                                }
                            </div>
                        </div>
                    </div>
                </OrderContainer>
            }
        </Modal>
    );
}

export default Order;