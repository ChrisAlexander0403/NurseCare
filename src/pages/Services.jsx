/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import numeral from 'numeral';

import useForm from '../hooks/useForm';
import useWindowsDimensions from '../hooks/useWindowsDimensions';
import { Create, ServicesContainer, ServicesStyles } from '../styles/ServicesStyles';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import InputFile from '../components/inputProfile/InputFile';
import serviceValidate from '../utils/validations/serviceValidate';
import { createServiceXmls, getServicesXmls } from '../XMLRequests/servicesRequests';
import useXMLRequest from '../hooks/useXMLRequest';

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
  const [device, setDevice] = useState('');

  let formRef = useRef(null);

  let isDark = useSelector(selectTheme);
  let session = useSelector(selectSession);
  let navigate = useNavigate();
  let location = useLocation();
  const request = useXMLRequest();
  let { height, width } = useWindowsDimensions();

  const updateUploadedFiles = (files) => setIcon(files);
  const updateUploadedFilesInBase64 = (files) => setValues({ ...values, icon: files });

  const submitForm = async ({ description, title, price, icon }) => {
    let xmls = createServiceXmls(session.id, id, description, title, price, icon, session.apikey);
    let response = await request(xmls, 'InsertServiceNurseReturn');
    if(response.status === 'success') {
      xmls = getServicesXmls(session.id, id, session.apikey);
      let response = await request(xmls, 'GetServicesNurseReturn');
      setServices(response.datos);
    }
    closeModal();
  }

  const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, serviceValidate);

  useEffect(() => {
    (async () => {
      let xmls = getServicesXmls(session.id, id, session.apikey);
      let response = await request(xmls, 'GetServicesNurseReturn');
      console.log(response);
      setServices(response.datos);
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
      <Outlet />
      <Modal 
        isOpen={isOpen} 
        closeModal={closeModal} 
        important={true}
        type='cancel'
        background={isDark ? '#181818' : '#EEE'}
        color='#417493'
        minWidth={device === 'mobile' ? '100%' : '380px'}
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
                <BiLeftArrowAlt style={{ fontSize: '24px' }} />
                { device !== 'mobile' && 'Categorías' }
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
              {
                device !== 'mobile' ?
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
                </div> :
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
              }
            </div>
          </ServicesContainer>
        </article>
      </ServicesStyles>
    </>
  );
}

export default Services;