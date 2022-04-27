import React, { useEffect, useState } from 'react';
import numeral from 'numeral';

import PieComponent from '../components/charts/PieComponent';
import BarComponent from '../components/charts/BarComponent';
import { getOrdersRequest } from '../requests/OrdersRequests';
import { useSelector } from 'react-redux';
import { selectSession } from '../features/slices/sessionSlice';
import { DashboardHomeContainer } from '../styles/DashboardHomeStyles';
import { selectTheme } from '../features/slices/themeSlice';

const DashboardHome = () => {

  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);

  // const getFiveMostSoldProducts = (array) => {
  //   if (array.length > 0) {
  //     let fiveMostSoldProducts = [];
  //     if (array.length > 5) {
  //       for (let i = 0; i < 5; i++) {
  //         let maxSells = Math.max(...array.map(e => e.))
  //       }
  //     } else {

  //     }
  //   }
  // }

  const orderArr = (unorderArr) => {
    let orderedArr = [];
    let canceled = [...unorderArr.filter(element => element.status === 'Cancelado')];
    let finished = [...unorderArr.filter(element => element.status === 'Terminado')];
    let rejected = [...unorderArr.filter(element => element.status === 'Rechazado')];
    orderedArr.push(...canceled, ...finished, ...rejected);
    return orderedArr;
  }

  const getTotalRevenue = (array) => {
    let finished = [...array.filter(element => element.status === 'Terminado')];
    let total = 0;
    finished.forEach((element) => {
    total += parseInt(element.total);
    setTotalRevenue(total);
    })
    return;
  }

  useEffect(() => {
    const getOrders = async () => {
      let response = await getOrdersRequest(session.id, session.apikey);
      console.log(response.datos)
      setOrders(orderArr(response.datos));
      getTotalRevenue(response.datos);
    }
    getOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardHomeContainer isDark={isDark}>
      <div className="pie">
        <PieComponent />
      </div>
      <div className="bar">
        <BarComponent />
      </div>
      <div className="details">
        <h3>Servicios</h3>
        <ul>
          <li>
            <div>
              <p>Completados:</p>
              &nbsp;
              &nbsp;
              <p>{orders.filter(element => element.status === 'Terminado').length}</p>
            </div>
          </li>
          <li>
            <div>
              <p>Cancelados: </p>
              &nbsp;
              &nbsp;
              <p>{orders.filter(element => element.status === 'Cancelado').length}</p>
            </div>
          </li>
          <li>
            <div>
              <p>Rechazados:</p>
              &nbsp;
              &nbsp;
              <p>{orders.filter(element => element.status === 'Rechazado').length}</p>
            </div>
          </li>
          <li>
            <div>
              <p>Ingresos totales:</p>
              &nbsp;
              &nbsp;
              <p>{numeral(totalRevenue).format("$0.00")}</p>
            </div>
          </li>
        </ul>
      </div>
    </DashboardHomeContainer>
  );
}

export default DashboardHome;