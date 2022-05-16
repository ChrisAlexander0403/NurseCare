import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

import '../styles/dashboard.scss';

import Orders from './Orders';
import DashboardHome from './DashboardHome';
import History from './History';
import Clients from './Clients';
import { selectTheme } from '../features/slices/themeSlice';
import { useSelector } from 'react-redux';
import Order from './Order';
import Client from './Client';
import useWindowsDimensions from '../hooks/useWindowsDimensions';

const Dashboard = () => {

    const [isActive, setIsActive] = useState(true);

    let isDark = useSelector(selectTheme);
    let { height, width } = useWindowsDimensions();

    const handleActive = () => {
        if (width <= 480) setIsActive(false);
    }

    useEffect(() => {
      if (width <= 480) setIsActive(false);
      //eslint-disable-next-line
    }, []);
    

  return (
    <main>
        <button 
            className='second-menu' 
            onClick={() => setIsActive(!isActive)}
            style={{ background: isDark ? '#213A4A' : '#417493' }}
        >
            <AiOutlinePlus 
                style={{ 
                    fontSize: '22px',
                    transform: isActive ? 'rotate(405deg)' : 'rotate(0)',
                    transition: '.3s'
                }}
            />
        </button>
        <aside>
            <div
                className="toolbar" 
                style={{ 
                    background: isDark ? '#213A4A' : '#417493',
                    left: isActive ? '0' : '-100%'
                }}
            >
                <p className="title">Dashboard</p>
                <div className="options">
                    <ul>
                        <li>
                            <NavLink to="home" onClick={handleActive}>Resumen</NavLink>
                        </li>
                        <li>
                            <NavLink to="orders" onClick={handleActive}>Pedidos</NavLink>
                        </li>
                        <li>
                            <NavLink to="history" onClick={handleActive}>Historial de pedidos</NavLink>
                        </li>
                        <li>
                            <NavLink to="clients" onClick={handleActive}>Clientes</NavLink>
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