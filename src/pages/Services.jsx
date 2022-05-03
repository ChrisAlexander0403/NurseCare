import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import numeral from 'numeral';

import useForm from '../hooks/useForm';
import { Create, ServicesContainer, ServicesStyles } from '../styles/ServicesStyles';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { createServiceRequest, getServicesRequest } from '../requests/ServicesRequests';
import InputFile from '../components/inputProfile/InputFile';
import serviceValidate from '../utils/validations/serviceValidate';

const Services = () => {

  let { id } = useParams();
  const [values, setValues] = useState({
    icon: '',
    title: '',
    description: '',
    catalog: id,
    price: 0
  });
  const [icon, setIcon] = useState("");
  const [isOpen, openModal, closeModal] = useModal(false);
  const [services, setServices] = useState([]);
  const [service, setService] = useState();

  let formRef = useRef(null);

  let isDark = useSelector(selectTheme);
  let session = useSelector(selectSession);
  let navigate = useNavigate();
  let location = useLocation();

  const updateUploadedFiles = (files) => setIcon(files);
  const updateUploadedFilesInBase64 = (files) => setValues({ ...values, icon: files });

  const submitForm = async ({ description, title, price, icon }) => {
    let response = await createServiceRequest(session.id, id, description, title, price, icon, session.apikey);
    if(response.status === 'success') {
      let response = await getServicesRequest(session.id, id, session.apikey);
      setServices(response.datos);
    }
    closeModal();
  }

  const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, serviceValidate);

  useEffect(() => {
    const getServices = async () => {
      let response = await getServicesRequest(session.id, id, session.apikey);
      console.log(response);
      setServices(response.datos);
    }
    getServices();
    //eslint-disable-next-line
  }, [location]);

  return (
    <>
      <Outlet />
      <Modal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        important={true}
        type='cancel'
        background={isDark ? '#181818' : '#EEE'}
        color='#417493'
        minWidth='380px'
        minHeight='500px'
        maxHeight='500px'
      >
        <Create isDark={isDark}>
          <p className="title">Agregar servicio</p>
          <form ref={formRef} onSubmit={handleSubmit} className="create-form">
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
              <label htmlFor="title">Nombre del servicio</label> 
              <input 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Servicio" 
                value={values.title}
                onChange={handleChange}
              />
              { errors.title && <div className="error">{ errors.title }</div> }
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción</label> 
              <textarea 
                rows={5} 
                name="description" 
                id="description" 
                placeholder="Descripción" 
                value={values.description}
                onChange={handleChange}
              />
            </div>
            { errors.description && <div className="error">{ errors.description }</div> }
            <div className="form-group">
              <label htmlFor="price">Precio</label> 
              <input 
                type="number" 
                name="price" 
                id="price" 
                placeholder="$0.00" 
                value={values.price}
                onChange={handleChange}
              />
              { errors.price && <div className="error">{ errors.price }</div> }
            </div>
            <button type="submit">Guardar</button>
          </form>
        </Create>
      </Modal>
      <ServicesStyles isDark={isDark}>
        <aside>
          <section>
            <div className='options'>
              <div className="go-back" onClick={() => navigate(-1)}>
                <BiLeftArrowAlt style={{ fontSize: '24px' }} />Categorías
              </div>
              <div className="title">Categorías</div>
              <button className='create' onClick={openModal}>
                <AiOutlinePlus style={{ fontSize: '18px' }} />
                <p>Crear &nbsp;</p>
              </button>
            </div>
          </section>
        </aside>
        <article>
          <ServicesContainer isDark={isDark}>
            <div className='main-container'>
              <div className="container-box">
                <div className="services">
                  { services && services.map((service) => {
                    return (
                      <div className="service" key={service.idServicio}>
                        <div className="img-container">
                          <img src={`http://thenursecare.com/Demo/${service.imagen}`} alt="" />
                        </div>
                        <div className="service-info">
                          <div className="service-header">
                            <p className="title">{service.nombre}</p>
                            <p className="price">{numeral(parseInt(service.costo)).format('$0.00')}</p>
                          </div>
                          <div className="service-body">
                            <p>{service.descripcion}</p>
                          </div>
                          <button onClick={() => navigate(service.idServicio)}>Detalles</button>
                        </div>
                      </div>
                    );
                  }) }
                </div>
              </div>
              {
                service &&
                <div className="container-box">

                </div>
              }
            </div>
          </ServicesContainer>
        </article>
      </ServicesStyles>
    </>
  );
}

export default Services;