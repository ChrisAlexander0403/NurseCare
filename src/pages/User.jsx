import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiFillSave } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { MdPersonAdd, MdPersonRemove } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useImageV2 from '../hooks/useImageV2';
import useModal from '../hooks/useModal';
import { EditUserRequest, getUserRequest, updateUserStatusRequest } from '../requests/UserRequests';
import { Arrow, DropdownContent, DropdownList } from '../styles/DropdownListStyles';
import { UserContainer } from '../styles/UserStyles';
import useForm from '../hooks/useForm';
import editUserValidate from '../utils/validations/editUserValidate';

const userTypes = [
    {
      id: '1',
      description: 'Administrador'
    },
    {
      id: '2',
      description: 'Reporteador'
    }
];

const User = () => {

    const [values, setValues] = useState({
        picture: '',
        name: '',
        email: '',
        password: '',
        rol: ''
    });
    const [user, setUser] = useState();
    const [editMode, setEditMode] = useState(false);
    const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('');

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

    const handleEdit = () => {
        setValues({
            picture: user.imagen,
            name: user.nombre,
            email: user.email,
            password: user.password,
            rol: user.rol
        });
        setSelected(user.rol === '1' ? 'Administrador' : 'Reporteador')
        setEditMode(true);
    }

    const handleEditUser = async  ({ name, email, password, rol }) => {
        let response = await EditUserRequest(session.id, name, email, password, rol, session.apikey);
        if (response.status === 'success') {
            response = await getUserRequest(session.id, id, session.apikey);
            setUser(response.datos[0]);
            setEditMode(false);
        }
    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, handleEditUser, editUserValidate);
    
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
                    <form onSubmit={handleSubmit} className="content">
                        <div className="content-line">
                            <label htmlFor='name'>Nombre</label>
                            {
                                editMode ? 
                                <input 
                                    id="name" 
                                    type="text" 
                                    placeholder="Nombre"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                /> : 
                                <p>{user.nombre}</p>
                            }
                        </div>
                        <div className="content-line">
                            <label htmlFor='email'>Correo</label>
                            {
                                editMode ? 
                                <input 
                                    id="email"
                                    type='text'
                                    placeholder="Correo"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                /> : 
                                <p>{user.email}</p>
                            }
                        </div>
                        <div className="content-line">
                            <p>Tipo</p>
                            {
                                editMode ? 
                                <DropdownList isDark={isDark} style={{ width: '250px' }}>
                                    <button type='button' onClick={() => setIsActive(!isActive)}>{selected}<Arrow /></button>
                                    {isActive && (
                                    <DropdownContent isDark={isDark}>
                                        {userTypes.map((userType, index) => {
                                        return (
                                            <div key={index} className="item" onClick={() => { 
                                            setSelected(userType.description);
                                            setIsActive(false);
                                            setValues({ ...values, rol: userType.id });
                                            }}>
                                            {userType.description}
                                            </div>
                                        );
                                        })}
                                    </DropdownContent>
                                    )}
                                </DropdownList> : 
                                <p>{
                                    user.rol === '1' ? 'Administrador'
                                    : user.rol === '2' && 'Reporteador'
                                }</p>
                            }
                        </div>
                        <div className="content-line">
                            <label htmlFor='password'>Contraseña</label>
                            {
                                editMode ? 
                                <input 
                                    id="password"
                                    type='password'
                                    placeholder="Contraseña"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                /> : 
                                <p>{'*'.repeat(user.password.length)}</p>
                            }
                        </div>
                        <div className="content-line">
                            <p>Estado</p>
                            <p>{
                                user.status === '0' ? 'Deshabilitado'
                                : user.status === '1' && 'Habilitado'
                            }</p>
                        </div>
                        <div className="content-line">
                            <div className="buttons">
                                {
                                    user.status === '0' 
                                    ? <button 
                                        type='button'
                                        className="enable"
                                        onClick={() => handleUpdateStatus(1)}
                                    ><MdPersonAdd style={{ marginRight: '8px', fontSize: '18px' }} />Habilitar</button>
                                    : <button 
                                        type='button'
                                        className="disable"
                                        onClick={() => handleUpdateStatus(0)}
                                    ><MdPersonRemove style={{ marginRight: '8px', fontSize: '18px' }} />Deshabilitar</button>
                                }
                                {
                                    editMode === true &&
                                    <button 
                                        type='submit'
                                        className="enable"
                                    ><AiFillSave style={{ marginRight: '8px', fontSize: '18px' }} />Guardar</button>
                                }
                                {
                                    !editMode ?
                                    <button 
                                        type='button'
                                        className="edit" 
                                        onClick={handleEdit}
                                    ><AiFillEdit style={{ marginRight: '8px', fontSize: '17px' }} />Editar</button>
                                    : 
                                    <button 
                                        type='button'
                                        className="cancel" 
                                        onClick={() => setEditMode(false)}
                                    ><IoMdClose style={{ marginRight: '8px', fontSize: '17px' }} />Cancelar</button>
                                }
                            </div>
                        </div>
                    </form>
                </UserContainer>
            }
        </Modal>
    );
}

export default User;