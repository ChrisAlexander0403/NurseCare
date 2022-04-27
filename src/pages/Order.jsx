import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import numeral from 'numeral';
import Modal from '../components/modal/Modal';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import { OrderContainer } from '../styles/OrderStyles';
import useImageV2 from '../hooks/useImageV2';
import { getOrderDetailsRequest, updateOrderRequest } from '../requests/OrdersRequests';
import { getServiceRequest } from '../requests/ServicesRequests';
import { getClient } from '../requests/ClientsRequests';
import { selectSession } from '../features/slices/sessionSlice';
import useFormatDate from '../hooks/useFormatDate';

const Order = () => {

    const [order, setOrder] = useState();
    const [client, setClient] = useState();
    const [service, setService] = useState();

    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpen, openModal, closeModal] = useModal(true, navigate);
    let isDark = useSelector(selectTheme);
    let session = useSelector(selectSession);
    const image = useImageV2();
    const image2 = useImageV2();
    const formatDate = useFormatDate();

    const handleChangeOrderStatus = async (idOrder, status) => {
        let response = await updateOrderRequest(session.id, idOrder, status, session.apikey);
        if(response.status === 'success') {
            let orderResponse = await getOrderDetailsRequest(session.id, id, session.apikey);
            if(orderResponse.status === 'success') {
                let clientResponse;
                let serviceResponse;
                setOrder(orderResponse.datos[0]);
                clientResponse = await getClient(session.id, orderResponse.datos[0].idCliente, session.apikey);
                setClient(clientResponse.datos[0]);
                serviceResponse = await getServiceRequest(session.id, orderResponse.datos[0].idServicio, session.apikey);
                console.log(serviceResponse);
                setService(serviceResponse.datos[0]);
            }
        }
    }

    useEffect(() => {
        (async () => {
            let orderResponse = await getOrderDetailsRequest(session.id, id, session.apikey);
            if(orderResponse.status === 'success') {
                let clientResponse;
                let serviceResponse;
                setOrder(orderResponse.datos[0]);
                clientResponse = await getClient(session.id, orderResponse.datos[0].idCliente, session.apikey);
                setClient(clientResponse.datos[0]);
                serviceResponse = await getServiceRequest(session.id, orderResponse.datos[0].idServicio, session.apikey);
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
                                    onClick={() => handleChangeOrderStatus(order.idServiceSol, 'Aceptado')} 
                                >Aceptar</button>
                                <button 
                                    className="reject" 
                                    onClick={() => handleChangeOrderStatus(order.idServiceSol, 'Rechazado')} 
                                >Rechazar</button></> : order.status === 'Aceptado' ?
                                <><button 
                                    className="accept" 
                                    onClick={() => handleChangeOrderStatus(order.idServiceSol, 'En curso')} 
                                >Iniciar</button>
                                <button 
                                    className="reject" 
                                    onClick={() => handleChangeOrderStatus(order.idServiceSol, 'Cancelado')} 
                                >Cancelar</button></> : order.status === 'En curso' &&
                                <><button 
                                    className="accept" 
                                    onClick={() => handleChangeOrderStatus(order.idServiceSol, 'Terminado')} 
                                >Terminar</button>
                                <button 
                                    className="reject" 
                                    onClick={() => handleChangeOrderStatus(order.idServiceSol, 'Cancelado')} 
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