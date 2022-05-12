import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
// import { BiDetail } from 'react-icons/bi';
import { MdContactPage } from 'react-icons/md';
// import { FaUserCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import { selectSession } from '../features/slices/sessionSlice';
import { Confirm, UsersContainer } from '../styles/UsersStyles';
import { Create } from '../styles/ServicesStyles';
import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';
import useForm from '../hooks/useForm';
import userValidate from '../utils/validations/userValidate';
import { selectTheme } from '../features/slices/themeSlice';
import { Arrow, DropdownContent, DropdownList } from '../styles/DropdownListStyles';
import InputFile from '../components/inputProfile/InputFile';
import useFormatDate from '../hooks/useFormatDate';
import { createUserXmls, deleteUserXmls, getAllUsersXmls } from '../XMLRequests/userRequests';
import useXMLRequest from '../hooks/useXMLRequest';
import useWindowsDimensions from '../hooks/useWindowsDimensions';

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

const Users = () => {

  const [values, setValues] = useState({
    picture: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    rol: ''
  });
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('Tipo de usuario');
  const [delitingUser, setDelitingUser] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [icon, setIcon] = useState("");
  const [device, setDevice] = useState('');
  // const [password, setPassword] = useState('');

  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);
  let navigate = useNavigate();
  let formatDate = useFormatDate();
  let location = useLocation();
  const request = useXMLRequest();
  let { height, width } = useWindowsDimensions();

  const [isOpen, openModal, closeModal] = useModal(false);
  const [confirmIsOpen, openConfirmModal, closeConfirmModal] = useModal(false);
  
  const handleCreateUser = async ({ picture, firstname, lastname, email, password, rol }) => {    
    let xmls = createUserXmls(session.id, picture, firstname, lastname, email, password, rol, session.apikey);
    let response = await request(xmls, 'InsertUserPortNurseReturn');
    console.log(response);
    if (response.status === 'success') {
      xmls = getAllUsersXmls(session.id, session.apikey);
      response = await request(xmls, 'GetUserNurseReturn');
      setUsers(response.datos);
      closeModal();
    }
  }

  const handleDeleteUser = async (user) => {
    // if (password) return;
    let xmls = deleteUserXmls(session.id, user, session.apikey);
    let response = await request(xmls, 'RemoveUserPortNurseReturn');
    if (response.status === 'success') {
      xmls = getAllUsersXmls(session.id, session.apikey);
      response = await request(xmls, 'GetUserNurseReturn');
      setUsers(response.datos);
      closeConfirmModal();
    }
  }

  const updateUploadedFiles = (files) => setIcon(files);
  const updateUploadedFilesInBase64 = (files) => setValues({ ...values, picture: files });
  
  const { handleChange, handleSubmit, errors } = useForm(values, setValues, handleCreateUser, userValidate);

  useEffect(() => {
    (async () => {
      let xmls = getAllUsersXmls(session.id, session.apikey);
      let response = await request(xmls, 'GetUserNurseReturn');
      setUsers(response.datos);
    })();
    //eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    // (() => {
    //   const ua = navigator.userAgent;
    //   if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    //     setDevice("tablet");
    //   }
    //   if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
    //   ) {
    //     setDevice("mobile");
    //   }
    //   setDevice("desktop");
    // })();
    if (width <= 480) {
      setDevice('mobile');
    }
  }, [width]);
  
  
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        type='cancel'
        background={isDark ? '#181818' : '#EEE'}
        color='#417493'
        minWidth='380px'
      >
        <Create isDark={isDark}>
          <p className="title">Agregar usuario</p>
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
              <label htmlFor="icon">Sube tu ícono (Tamaño máximo 500kb)</label>
              <InputFile 
                isDark={isDark}
                accept={".png,.jpeg,.jpg"}
                updateFilesCb={updateUploadedFiles}
                updateFilesBase64Cb={updateUploadedFilesInBase64}
              />
              { errors.icon && <div className="error">{ errors.icon }</div> }
            </div>
            <div className="form-group">
              <label htmlFor="firstname">Nombre(s)</label> 
              <input 
                id="firstname" 
                type="text" 
                placeholder="Nombre(s)"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
              />
            </div>
            {errors.firstname && <span className="error">{errors.firstname}</span>}
            <div className="form-group">
              <label htmlFor="lastname">Apellido(s)</label> 
              <input 
                id="lastname" 
                type="text" 
                placeholder="Apellido(s)" 
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
              />
            </div>
            {errors.lastname && <span className="error">{errors.lastname}</span>}
            <div className="form-group">
              <label htmlFor="email">Correo</label> 
              <input 
                id="email" 
                type="email" 
                placeholder="usuario@nursecare.com"
                name="email" 
                value={values.email.replace(/\s+/g, '')}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label> 
              <input 
                id="password" 
                type="password" 
                placeholder="Contraseña" 
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
            <div className="form-group">
              <DropdownList isDark={isDark}>
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
              </DropdownList>
            </div>
            { errors.rol && <div className="error">{errors.rol}</div> }
            <button type="submit">Guardar</button>
          </form>
        </Create>
      </Modal>
      <Modal
        isOpen={confirmIsOpen}
        type={'closing'}
        important={false}
        background={isDark ? '#181818' : '#EEE'}
        maxHeight='140px'
        minHeight='140px'
      >
        <Confirm isDark={isDark}>
          <div className="info">
            <p>¿Seguro que deseas eliminar este usuario?</p>
            {/* <div className="password-container">
              <label htmlFor="password">Ingresa tu contraseña para continuar</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> */}
          </div>
          <div className="buttons">
              <button onClick={() => handleDeleteUser(delitingUser.idUser)}>Eliminar</button>
              <button className='cancel' onClick={closeConfirmModal}>Cancelar</button>
          </div>
        </Confirm>
      </Modal>
      <UsersContainer isDark={isDark}>
        <div className="options">
          <div className='create' onClick={openModal}>
            <AiOutlinePlus style={{ fontSize: '18px' }} />
            <p>Crear &nbsp;</p>
          </div>
        </div>
        <div className='main-container'>
          {users && users.map((user) => {
            return (
              user.rol === '0' || user.status === '2' ? false :
              user.idUser === session.id ? false :
              <div className="user" key={user.idUser}>
                <div className="user-header">
                  <p className="name">{user.nombre}</p>
                  <p className="date">{user.fechaCreacion 
                    ? formatDate(user.fechaCreacion.slice(0,10)).compressedDate 
                    : '17/02/22'}
                  </p>
                </div>
                <div className="user-info-preview">
                  <p className="type">{
                    user.rol === '1' ? 'Administrador' : 
                    user.rol === '2' && 'Reporteador'
                  }</p>
                  <p className="status">Estado: {
                    user.status === '0' ? 'Deshabilidato' :
                    user.status === '1' && 'Habilitado'
                  }</p>
                </div>
                <div className="buttons">
                  <button 
                    onClick={() => navigate(user.idUser)}
                  ><MdContactPage style={{ fontSize: '18px', marginRight: device !== 'mobile' ? '8px' : '0' }} /> {device !== 'mobile' && 'Detalles'}</button>
                  <button 
                    className="delete"
                    onClick={() => {setDelitingUser(user); openConfirmModal();}}
                  ><AiFillDelete style={{ fontSize: '18px', marginRight: device !== 'mobile' ? '8px' : '0' }} /> {device !== 'mobile' && 'Eliminar'}</button>
                </div>
              </div>
            )
          })}
          {/* <div className="container-box">
            <div className="users">
              <div className="user">
                <div className="user-header">
                  <p className="name">Usario Empleado</p>
                  <p className="date">17/02/22</p>
                </div>
                <div className="user-info-preview">
                  <p className="type">Enfermera</p>
                  <p className="status">Estado: Activa</p>
                </div>
                <button>Detalles <HiOutlineArrowNarrowRight /></button>
              </div>
            </div>
          </div>
          <div className="container-box">
            <div className="image-container">
              <img style={{ "objectFit": `${!exists ? "contain" : "cover"}` }} src={img} alt="Profile" />
            </div>
            <div className="user-container">
              <div className="user-info-container">

              </div>
            </div>
            <div className="buttons">
                <button className="edit">Editar</button>
                <button className="delete">Eliminar</button>
              </div>
          </div> */}
        </div>
      </UsersContainer>
      <Outlet />
    </>
  );
}

export default Users;