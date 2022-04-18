import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { useSelector } from 'react-redux';

import { selectSession } from '../features/slices/sessionSlice';
import { UsersContainer } from '../styles/UsersStyles';
import useImage from '../hooks/useImage';
import { Create } from '../styles/ServicesStyles';
import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';
import useForm from '../hooks/useForm';
import userValidate from '../utils/validations/userValidate';
import { createUserXmls } from '../XMLRequests/userRequests';
import { selectTheme } from '../features/slices/themeSlice';

const Users = () => {

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);

  let { img, exists } = useImage("");
  const [isOpen, openModal, closeModal] = useModal(false);
  
  const handleCreateUser = async ({ firstname, lastname, email, password }) => {    
    let xmls = createUserXmls(session.id, firstname, lastname, email, password, session.apikey);
    try {
      const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', 
        xmls, { withCredentials: false }, {
          headers: {
              'Content-Type': 'text/xml'
          }
      });
      let xml = new XMLParser().parseFromString(data.data);
      console.log(xml);
      let tag = xml.getElementsByTagName('LoginNurseReturn');
      let response = JSON.parse(tag[0].value);
      console.log(response);
    } catch(error) {
      console.log(error);
    }
  }
  
  const { handleChange, handleSubmit, errors } = useForm(values, setValues, handleCreateUser, userValidate);

  useEffect(() => {
    
  
  }, []);
  
  
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
            <button type="submit">Guardar</button>
          </form>
        </Create>
      </Modal>
      <UsersContainer isDark={isDark}>
        <div className="options">
          <div className='create' onClick={openModal}>
            <AiOutlinePlus style={{ fontSize: '18px' }} />
            <p>Crear &nbsp;</p>
          </div>
        </div>
        <div className='main-container'>
          <div className="user">
            <div className="user-header">
              <p className="name">Usuario Empleado</p>
              <p className="date">17/02/22</p>
            </div>
            <div className="user-info-preview">
              <p className="type">Enfermera</p>
              <p className="status">Estado: Activa</p>
            </div>
            <div className="buttons">
              <button><AiFillEdit /> Editar</button>
              <button className="delete"><AiFillDelete /> Eliminar</button>
            </div>
          </div>
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
    </>
  );
}

export default Users;