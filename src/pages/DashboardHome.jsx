import React from 'react';
import '../styles/dashboard-home.scss';

import PieComponent from '../components/charts/PieComponent';
import BarComponent from '../components/charts/BarComponent';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="bar">
        <BarComponent />
      </div>
      <div className="pie">
        <PieComponent />
      </div>
      <div className="details">
        <h3>Servicios</h3>
        <ul>
          <li>
            <div>
              <p>Completados:</p>
              &nbsp;
              &nbsp;
              <p>1</p>
            </div>
          </li>
          <li>
            <div>
              <p>Cancelados: </p>
              &nbsp;
              &nbsp;
              <p>2</p>
            </div>
          </li>
          <li>
            <div>
              <p>Ingresos totales:</p>
              &nbsp;
              &nbsp;
              <p>$350.00</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardHome;