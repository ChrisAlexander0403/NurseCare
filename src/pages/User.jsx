import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useImageV2 from '../hooks/useImageV2';
import useModal from '../hooks/useModal';
import { getUserRequest, updateUserStatusRequest } from '../requests/UserRequests';
import { UserContainer } from '../styles/UserStyles';

const User = () => {

    const [user, setUser] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    let session = useSelector(selectSession);
    let isDark = useSelector(selectTheme);
    const image = useImageV2();

    const [isOpen, openModal, closeModal] = useModal(true, navigate);

    const handleUpdateStatus = async (status) => {
        let response = await updateUserStatusRequest(session.id, user.email, status, session.apikey );
        if (response.status === 'success') {
            response = await getUserRequest(session.id, id, session.apikey);
            setUser(response.datos[0]);
        }
    }

    useEffect(() => {
        (async () => {
            let response = await getUserRequest(session.id, id, session.apikey);
            setUser(response.datos[0]);
        })();
        //eslint-disable-next-line
    }, []);
    

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            type='close'
            background={isDark ? '#181818' : '#EEE'}
            color='#417493'
            minWidth='460px'
        >
            {user && 
                <UserContainer isDark={isDark}>
                    <div className="user-image">
                        <div className="img-container">
                            {
                                image(`http://thenursecare.com/Demo/${user.imagen}`).exists
                                ? <img src={image(`http://thenursecare.com/Demo/${user.imagen}`).img} alt="" />
                                : <FaUser style={{ fontSize: '110px', color: isDark ? '#383838' : '#CCC' }} /> 

                            }
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-line">
                            <p>Nombre</p>
                            <p>{user.nombre}</p>
                        </div>
                        <div className="content-line">
                            <p>Correo</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="content-line">
                            <p>Tipo</p>
                            <p>{
                                user.rol === '1' ? 'Administrador'
                                : user.rol === '2' && 'Reporteador'
                            }</p>
                        </div>
                        <div className="content-line">
                            <p>Contraseña</p>
                            <p>{'*'.repeat(user.password.length)}</p>
                        </div>
                        <div className="content-line">
                            <p>Estado</p>
                            <p>{
                                user.status === '0' ? 'Deshabilitado'
                                : user.status === '1' && 'Habilitado'
                            }</p>
                        </div>
                    </div>
                    <div className="buttons">
                        {
                            user.status === '0' 
                            ? <button 
                                className="enable"
                                onClick={() => handleUpdateStatus(1)}
                            ><MdPersonAdd style={{ marginRight: '8px', fontSize: '18px' }} />Habilitar</button>
                            : <button 
                                className="disable"
                                onClick={() => handleUpdateStatus(0)}
                            ><MdPersonRemove style={{ marginRight: '8px', fontSize: '18px' }} />Deshabilitar</button>
                        }
                        <button className="edit"><AiFillEdit style={{ marginRight: '8px', fontSize: '17px' }} />Editar</button>
                    </div>
                </UserContainer>
            }
        </Modal>
    );
}

export default User;