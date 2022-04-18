import React, { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import numeral from 'numeral';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useFormatDate from '../hooks/useFormatDate';

import { OrdersContainer } from '../styles/OrdersStyles';
import { getOrdersRequest } from '../requests/OrdersRequests';

const Orders = () => {

  const [orders, setOrders] = useState([]);

  let isDark = useSelector(selectTheme);
  let session = useSelector(selectSession);
  let formatDate = useFormatDate();

  useEffect(() => {

    const getOrders = async () => {
      let response = await getOrdersRequest(session.id, session.apikey);
      setOrders(response.datos);
    }

    const intervalId = setInterval(() => { 
      getOrders();
      console.log(orders);
    }, 30000);

    getOrders();
    console.log(orders);

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
              return (
                <div className="order" key={order.idServiceSol}>
                  <div className="header">
                    <p className="title">Pedido #1</p>
                    <p className="date">{formatDate(order.fechaServicio.slice(0,10)).compressedDate}</p>
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
                    <button className="accept">Aceptar</button>
                    <button className="reject">Rechazar</button>
                    <button className="details">Detalles <HiOutlineArrowNarrowRight /></button>
                  </div>
                </div>
              );
            }) }
          </div>
        </div>
        <div className="container-box">
    
        </div>
      </div>
    </OrdersContainer>
  );
}

export default Orders;