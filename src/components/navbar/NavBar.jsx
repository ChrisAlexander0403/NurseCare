import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { selectSession } from '../../features/slices/sessionSlice';
import { selectTheme } from '../../features/slices/themeSlice';
import { Nav } from './NavBarStyles';
import { AiOutlineMenu } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';

const NavBar = () => {

    const [click, setClick] = useState(false);

    let navigate = useNavigate();
    let session = useSelector(selectSession);
    // let dispatch = useDispatch();
    let isDark = useSelector(selectTheme);
    // let switchRef = useRef(null);

    const redirect = () => {
        navigate('/settings/account');
        setClick(false);
    }
    const closeMobile = () => setClick(false);

    // useEffect(() => {
    //     switchRef.current.addEventListener('click', () => {
    //         dispatch(switchTheme());
    //     });
    //     // eslint-disable-next-line
    // }, []);

    return (
        <Nav isDark={isDark}>
            <Link to="/" className='logo'><img src="assets/logo.png" alt="" /></Link>
            <div className="mobile" onClick={() => setClick(!click)}>
                { click ? <CgClose /> : <AiOutlineMenu /> }
            </div>
            <ul className={click ? 'active' : null}>
                {/* <li><NavLink to="/">Inicio</NavLink></li> */}
                <li><NavLink to="/dashboard" onClick={closeMobile}>Dashboard</NavLink></li>
                <li><NavLink to="/services" onClick={closeMobile}>Servicios</NavLink></li>
                <li><NavLink to="/settings" onClick={closeMobile}>Configuración</NavLink></li>
                {
                    session && <li><p onClick={redirect} className="user">{session.name}</p></li>
                }
            </ul>
        </Nav>
    );
}

export default NavBar;