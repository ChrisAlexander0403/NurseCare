// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useFormatDate from '../hooks/useFormatDate';
import { HistoryContainer } from '../styles/HistoryStyles';
import useXMLRequest from '../hooks/useXMLRequest';
import { getOrdersXmls } from '../XMLRequests/ordersRequests';

const History = () => {

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState();

  const navigate = useNavigate();
  let isDark = useSelector(selectTheme);
  let session = useSelector(selectSession);
  let formatDate = useFormatDate();
  const request = useXMLRequest();

  const orderArr = (unorderArr) => {
    let orderedArr = [];
    let canceled = [...unorderArr.filter(element => element.status === 'Cancelado')];
    let finished = [...unorderArr.filter(element => element.status === 'Terminado')];
    let rejected = [...unorderArr.filter(element => element.status === 'Rechazado')];
    orderedArr.push(...canceled, ...finished, ...rejected);
    return orderedArr;
  }

  useEffect(() => {
    (async () => {
      let xmls = getOrdersXmls(session.id, session.apikey);
      let response = await request(xmls, 'GetServicesSolNurseReturn');
      setOrders(orderArr(response.datos));
    }
    )();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <HistoryContainer isDark={isDark}>
      <h1>Historial de pedidos</h1>
      <div className="main-container">
          <div className="filters">
            <form className="search">
              <input type="text" name="search" id="search" />
              <button><BiSearch /></button>
            </form>
          </div>
          <div className="orders">
            {
              orders && orders.map((order) => {
                return (
                  <div className="order">
                    <div className="info">
                      <div className="header">
                        <p className="title">Pedido #{order.idServiceSol}</p>
                        <p className='date'>{formatDate(order.fechaSolServ.slice(0,10)).compressedDate}</p>
                      </div>
                      <div className="body">
                        <p className="client">{order.cometario}</p>
                      </div>
                      <button onClick={() => navigate(order.idServiceSol)}>Detalles <HiOutlineArrowNarrowRight /></button>
                    </div>
                    {
                      order.status === 'Terminado' ?
                      <div className="status checked">
                        <BsCheckLg />
                        <p>Completado</p>
                      </div> : order.status === 'Cancelado' ? 
                      <div className="status canceled">
                        <BsXLg />
                        <p>Cancelado</p>
                      </div> : order.status === 'Rechazado' &&
                      <div className="status canceled">
                        <BsXLg />
                        <p>Rechazado</p>
                      </div>
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
        {
          order && 
          <div className="container-box">

          </div>
        }
      
    </HistoryContainer>
    <Outlet />
    </>
  );
}

export default History;