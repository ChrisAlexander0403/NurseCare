import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Users from './Users';
import Interface from './Interface';
import SettingsMain from './SettingsMain';
import Account from './Account';
import { logout } from '../features/slices/sessionSlice';
import useModal from '../hooks/useModal';
import Modal from '../components/modal/Modal';
import { CloseSession } from '../styles/SettingsStyles';
import { selectTheme } from '../features/slices/themeSlice';
import User from './User';
import { AiOutlinePlus } from 'react-icons/ai';
import useWindowsDimensions from '../hooks/useWindowsDimensions';

const Settings = () => {

    const [isActive, setIsActive] = useState(true);
    
    const [isOpen, openModal, closeModal] = useModal();
    const dispatch = useDispatch();
    let isDark = useSelector(selectTheme);
    let { height, width } = useWindowsDimensions();

    const handleLogout = () => {
        dispatch(logout());
    }

    const handleActive = () => {
        if (width <= 480) setIsActive(false);
    }

    useEffect(() => {
        if (width <= 480) setIsActive(false);
        //eslint-disable-next-line
      }, []);

  return (
    <>
    <Modal 
        isOpen={isOpen}
        type={'closing'}
        important={false}
        background={isDark ? '#181818' : '#EEE'}
        maxHeight='140px'
        minHeight='140px'
    >
        <CloseSession>
            <div className="info"><p>¿Seguro que deseas cerrar sesión?</p></div>
            <div className="buttons">
                <button onClick={handleLogout}>Cerrar sesión</button>
                <button className='cancel' onClick={closeModal}>Cancelar</button>
            </div>
        </CloseSession>
    </Modal>
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
                <p className="title">Configuración</p>
                <div className="options">
                    <ul>
                        <li>
                            <NavLink to="main" onClick={handleActive}>General</NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="interface">Interfaz de aplicación</NavLink>
                        </li> */}
                        <li>
                            <NavLink to="users" onClick={handleActive}>Usuarios</NavLink>
                        </li>
                        <li>
                            <NavLink to="account" onClick={handleActive}>Cuenta</NavLink>
                        </li>
                        <li>
                            <button onClick={() => {setIsActive(false); openModal()}}><FaSignOutAlt />&nbsp;&nbsp;&nbsp;Cerrar sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <article>
            <div className="pages">
                <Routes>
                    <Route path="main" exact element={<SettingsMain />} />
                    <Route path="interface" exact element={<Interface />} />
                    <Route path="users" exact element={<Users />}>
                        <Route path=":id" element={<User />} />
                    </Route>
                    <Route path="account" exact element={<Account />} />
                    <Route path="/" exact element={<Navigate to="main" />} />
                </Routes>
            </div>
        </article>
    </main>
    </>
  );
}

export default Settings;