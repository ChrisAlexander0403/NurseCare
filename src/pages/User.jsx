import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import { getUserRequest } from '../requests/UserRequests';
import { UserContainer } from '../styles/UserStyles';

const User = () => {

    const [user, setUser] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    let session = useSelector(selectSession);
    let isDark = useSelector(selectTheme);

    const [isOpen, openModal, closeModal] = useModal(true, navigate);

    useEffect(() => {
        const getUser = async () => {
            let response = await getUserRequest(session.id, id, session.apikey);
            setUser(response.datos[0]);
            console.log(user);
        }
        getUser();
        //eslint-disable-next-line
    }, []);
    

    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            type='cancel'
            background={isDark ? '#181818' : '#EEE'}
            color='#417493'
            minWidth='460px'
        >
            {user && 
                <UserContainer isDark={isDark}>
                    <div className="user-image">
                        <div className="img-container">
                            <img src={`http://thenursecare.com/Demo/${user.imagen}`} alt="" />
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

                    </div>
                </UserContainer>
            }
        </Modal>
    );
}

export default User;