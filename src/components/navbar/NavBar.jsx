import React/*, { useEffect, useRef }*/ from 'react';
import { useSelector, /*useDispatch*/ } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { selectSession } from '../../features/slices/sessionSlice';
import { selectTheme, /*switchTheme*/ } from '../../features/slices/themeSlice';
import { Nav/*, Switch, ThemeDiv, Sun, Moon*/ } from './NavBarStyles';

const NavBar = () => {

    let navigate = useNavigate();
    let session = useSelector(selectSession);
    // let dispatch = useDispatch();
    let isDark = useSelector(selectTheme);
    // let switchRef = useRef(null);

    const redirect = () => {
        navigate('/settings/account');
    }

    // useEffect(() => {
    //     switchRef.current.addEventListener('click', () => {
    //         dispatch(switchTheme());
    //     });
    //     // eslint-disable-next-line
    // }, []);

    return (
        <Nav isDark={isDark}>
            <Link to="/" className='logo'><img src="assets/logo.png" alt="" /></Link>
            <ul>
                {/* <li><NavLink to="/">Inicio</NavLink></li> */}
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/services">Servicios</NavLink></li>
                <li><NavLink to="/settings">Configuración</NavLink></li>
                {
                    session && <li><p onClick={redirect} className="user">{session.name}</p></li>
                }
                {/* <li>
                    <ThemeDiv>
                        { 
                            !isDark ? <Sun />
                            : <Moon />
                        }
                        <Switch 
                            type="checkbox" 
                            name=""
                            ref={switchRef}
                            defaultChecked={isDark && true}
                        />
                    </ThemeDiv>
                </li> */}
            </ul>
        </Nav>
    );
}

export default NavBar;