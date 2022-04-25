import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import numeral from 'numeral';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useFormatDate from '../hooks/useFormatDate';

import { OrdersContainer } from '../styles/OrdersStyles';
import { getOrderDetailsRequest, getOrdersRequest, updateOrderRequest } from '../requests/OrdersRequests';
import { getClient } from '../requests/ClientsRequests';
import useImageV2 from '../hooks/useImageV2';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState();
  const [client, setClient] = useState();
  // const [service, setService] = useState();

  let isDark = useSelector(selectTheme);
  let session = useSelector(selectSession);
  let formatDate = useFormatDate();
  const image = useImageV2();

  const handleChangeOrderStatus = async (idOrder, status) => {
    let response = await updateOrderRequest(session.id, idOrder, status, session.apikey);
    if(response.status === 'success') {
      response = await getOrdersRequest(session.id, session.apikey);
      setOrders(orderArray(response.datos));
    }
  }

  const handleGetOrder = async (idOrder) => {
    let response = await getOrderDetailsRequest(session.id, idOrder, session.apikey);
    if(response.status === 'success') {
      setOrder(response.datos[0]);
      response = await getClient(session.id, response.datos[0].idCliente, session.apikey);
      console.log(response.datos)
      setClient(response.datos[0]);
      // response = await getService
    }
  }

  const orderArray = (unorderedArr) => {
    let mediumArr = [...unorderedArr.filter(element => element.status !== 'Recibido')];
    let orderedArr = [...unorderedArr.filter(element => element.status === 'Recibido')];
    orderedArr.push(...mediumArr);
    return orderedArr;
  }

  useEffect(() => {

    const getOrders = async () => {
      let response = await getOrdersRequest(session.id, session.apikey);

      console.log(response.datos);
      setOrders(orderArray(response.datos));
    }

    const intervalId = setInterval(() => { 
      getOrders();
    }, 10000);

    getOrders();

    return (() => {
      clearInterval(intervalId);
    });

    // eslint-disable-next-line
  }, []);
  

  return (
    <OrdersContainer isDark={isDark}>
      <h1>Pedidos en curso</h1>
      <div className="main-container">
        <div className="container-box">
          <div className="orders">
            { orders && orders.map((order) => {
              return ( order.status === 'Rechazado' ? false :
                order.status === 'Cancelado' ? false :
                order.status === 'Terminado' ? false :
                <div className="order" key={order.idServiceSol}>
                  <div className="header">
                    <p className="title">Pedido #{order.idServiceSol}</p>
                    <p className="date">{order.status}</p>
                  </div>
                  <div className="body">
                    <p>Para: {
                      order.fechaSolServ.length > 2
                      ? formatDate(order.fechaSolServ.slice(0,10)).compressedDate + ' a las ' + order.fechaSolServ.slice(11,16)
                      : 'No hay fecha definida'
                    }</p>
                    <p>{numeral(order.total).format('$0.00')}</p>
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
                    <button 
                      className="details"
                      onClick={() => handleGetOrder(order.idServiceSol)}
                    >Detalles <HiOutlineArrowNarrowRight /></button>
                  </div>
                </div>
              );
            }) }
          </div>
        </div>
        {
          order && client &&
          <div className="container-box">
            <div className="order">
              <div className="img-container">
                <img src="" alt="" />
              </div>
              <div className="header">Nombre de servicio</div>
              <div className="body">
                <div className="service">

                </div>
                <div className="client">
                  <div className="img-container">
                    <img src={image(`http://thenursecare.com/Demo/${client.imagen}`).img}  alt="" />
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
              </div>
            </div>
          </div>
        }
      </div>
    </OrdersContainer>
  );
}

export default Orders;