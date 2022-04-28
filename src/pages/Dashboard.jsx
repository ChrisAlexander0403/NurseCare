import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';

import '../styles/dashboard.scss';

import Orders from './Orders';
import DashboardHome from './DashboardHome';
import History from './History';
import Clients from './Clients';
import { selectTheme } from '../features/slices/themeSlice';
import { useSelector } from 'react-redux';
import Order from './Order';
import Client from './Client';

const Dashboard = () => {

    let isDark = useSelector(selectTheme);

  return (
    <main>
        <aside>
            <div className="toolbar" style={{ background: isDark ? '#213A4A' : '#417493' }}>
                <p className="title">Dashboard</p>
                <div className="options">
                    <ul>
                        <li>
                            <NavLink to="home">Resumen</NavLink>
                        </li>
                        <li>
                            <NavLink to="orders">Pedidos</NavLink>
                        </li>
                        <li>
                            <NavLink to="history">Historial de pedidos</NavLink>
                        </li>
                        <li>
                            <NavLink to="clients">Clientes</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <article>
            <div className="pages">
                <Routes>
                    <Route path="home" exact element={<DashboardHome />} />
                    <Route path="orders" exact element={<Orders />}>
                        <Route path=":id" element={<Order />}/>
                    </Route>
                    <Route path="history" exact element={<History />}>
                        <Route path=":id" element={<Order />} />
                    </Route>
                    <Route path="/" exact element={<Navigate to="home" />} />
                    <Route path="clients" exact element={<Clients />}>
                        <Route path=":id" element={<Client />} />
                    </Route>
                </Routes>
            </div>
        </article>
    </main>
  );
}

export default Dashboard;