import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import numeral from 'numeral';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useFormatDate from '../hooks/useFormatDate';

import { OrdersContainer } from '../styles/OrdersStyles';
import useXMLRequest from '../hooks/useXMLRequest';
import { getOrdersXmls, updateOrderXmls } from '../XMLRequests/ordersRequests';

const Orders = () => {

  const [orders, setOrders] = useState([]);

  let isDark = useSelector(selectTheme);
  let session = useSelector(selectSession);
  let navigate = useNavigate();
  let formatDate = useFormatDate();
  const request = useXMLRequest();
  let { location } = useLocation();

  const handleChangeOrderStatus = async (idOrder, status) => {
    let xmls = updateOrderXmls(session.id, idOrder, status, session.apikey);
    let response = await request(xmls, 'UpdateStatusServiceNurseReturn');
    if(response.status === 'success') {
      xmls = getOrdersXmls(session.id, session.apikey);
      response = await request(xmls, 'GetServicesSolNurseReturn');
      setOrders(orderArray(response.datos));
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
      let xmls = getOrdersXmls(session.id, session.apikey);
      let response = await request(xmls, 'GetServicesSolNurseReturn');
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

  useEffect(() => {
    (async () => {
      let xmls = getOrdersXmls(session.id, session.apikey);
      let response = await request(xmls, 'GetServicesSolNurseReturn');
      setOrders(orderArray(response.datos));
    })();

    // eslint-disable-next-line
  }, [location]);
  


  return (
    <>
    <OrdersContainer isDark={isDark}>
      <h1>Pedidos en curso</h1>
      <div className="main-container">

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
                      onClick={() => navigate(order.idServiceSol)}
                    >Detalles <HiOutlineArrowNarrowRight /></button>
                  </div>
                </div>
              );
            }) }
          </div>
        </div>
    </OrdersContainer>
    <Outlet />
    </>
  );
}

export default Orders;