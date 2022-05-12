import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useFormatDate from '../hooks/useFormatDate';
import useXMLRequest from '../hooks/useXMLRequest';
import { AccountContainer } from '../styles/AccountStyles';
import { getUserXmls } from '../XMLRequests/userRequests';

const Account = () => {

  const [user, setUser] = useState();


  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);

  const formatDate = useFormatDate();
  const request = useXMLRequest();

  useEffect(() => {
    (async () => {
        let xmls = getUserXmls(session.id, session.id, session.apikey);
        let response = await request(xmls, 'GetUserByIdNurseReturn');
        setUser(response.datos[0]);
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <AccountContainer isDark={isDark}>
      {user &&
        <div className="user">
          <div className="user-image">
            <div className="img-container">
              <img src={`http://thenursecare.com/Demo/${user.imagen}`} alt="" />
            </div>
          </div>
          <div className="header">
            <p>{user.nombre}</p>
          </div>
          <div className="content">
            <div className="content-line">
              <p>Correo</p>
              <p>spideralex44@gmail.com</p>
            </div>
            <div className="content-line">
              <p>Tipo</p>
              <p>{
                user.rol === '1' ? 'Administrador' : 
                user.rol === '2' && 'Reporteador'
              }</p>
            </div>
            <div className="content-line">
              <p>Contraseña</p>
              <p>{'*'.repeat(user.password.length)}</p>
            </div>
            <div className="content-line">
              <p>Fecha de creación</p>
              <p>{formatDate(user.fechaCreacion).completeDate}</p>
            </div>
            <div className="content-line">
              <p>Otro dato</p>
              <p>Información de otro dato</p>
            </div>
          </div>
        </div>
      }
    </AccountContainer>
  )
}

export default Account