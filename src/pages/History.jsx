// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/slices/themeSlice';
import { HistoryContainer } from '../styles/HistoryStyles';

const History = () => {

  let isDark = useSelector(selectTheme);

// const [ordersRequest, setOrdersRequest] = useState();

//   useEffect(() => {
    
//     let intervalId = setInterval(() => {
//       setOrdersRequest(axios.get('url', {
//         params: {
//           status: ['Terminado, Cancelado']
//         }
//       }));
//       console.log(ordersRequest);
//     }, 10000);
  
//     return () => {
//       clearInterval(intervalId);
//     }
//   }, [ordersRequest]);
  

  return (
    <HistoryContainer isDark={isDark}>
      <h1>Historial de pedidos</h1>
      <div className="main-container">
        <div className="container-box">
          <div className="orders">
            <div className="order">
              <div className="info">
                <div className="header">
                  <p className="title">Pedido #122222</p>
                  <p className='date'>12-12-1212</p>
                </div>
                <div className="body">
                  <p className="client">Nombre de cliente</p>
                </div>
                <button>Detalles <HiOutlineArrowNarrowRight /></button>
              </div>
              <div className="status checked">
                <BsCheckLg />
                <p>Completado</p>
              </div>
            </div>
            <div className="order">
              <div className="info">
                <div className="header">
                  <p className="title">Pedido #2</p>
                  <p className='date'>12-12-1212</p>
                </div>
                <div className="body">
                  <p className="client">Nombre de cliente</p>
                </div>
                <button>Detalles <HiOutlineArrowNarrowRight /></button>
              </div>
              <div className="status canceled">
                <BsXLg />
                <p>Cancelado</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-box">

        </div>
      </div>
    </HistoryContainer>
  );
}

export default History;