import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useForm from '../hooks/useForm';
import useImageV2 from '../hooks/useImageV2';
import useModal from '../hooks/useModal';
import { deleteServiceRequest, getServiceRequest } from '../requests/ServicesRequests';
import { ServiceContainer } from '../styles/ServiceStyles';
import serviceValidate from '../utils/validations/serviceValidate';
import numeral from 'numeral';
import useFormatDate from '../hooks/useFormatDate';

const Service = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [service, setService] = useState();
    const [editMode, setEditMode] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    let session = useSelector(selectSession);
    let isDark = useSelector(selectTheme);
    const image = useImageV2();
    const formatDate = useFormatDate();

    const [isOpen, openModal, closeModal] = useModal(true, navigate);

    const handleEditService = async () => {

    }

    const handleDelete = async () => {
        let response = await deleteServiceRequest(session.id, id, session.apikey);
        if (response.status === 'success') navigate(-1);
    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, handleEditService, serviceValidate);

    useEffect(() => {
        (async () => {
            let response = await getServiceRequest(session.id, id, session.apikey);
            setService(response.datos[0]);
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
        { service && 
            <ServiceContainer isDark={isDark}>
                <id className="service-image">
                    <div className="image-container">
                        {
                            image().exists
                            && <img src={`http://thenursecare.com/Demo/${service.imagen}`} alt="" />
                        }
                    </div>
                </id>
                <form onSubmit={handleSubmit} className='content'>
                    <p>Creado el {formatDate(service.fechaCreacion).completeDate}</p>
                    <div className="content-line">
                        <label htmlFor="name">Nombre de servicio</label>
                        {
                            editMode ?
                            <input 
                                id='name'
                                type='text'
                                placeholder='Nombre de servicio'
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                            /> :
                            <p>{service.nombre}</p>
                        }
                    </div>
                    <div className="content-line">
                        <label htmlFor="description">Descripción</label>
                        {
                            editMode ?
                            <textarea
                                rows={5} 
                                id='description'
                                placeholder='Descripcion'
                                name='description'
                                value={values.description}
                                onChange={handleChange}
                            /> :
                            <p className="description">{service.descripcion}</p>
                        }
                    </div>
                    <div className="content-line">
                        <label htmlFor="price">Precio</label>
                        {
                            editMode ?
                            <input 
                                id='price'
                                type='number'
                                placeholder='$0.00'
                                name='price'
                                value={values.price}
                                onChange={handleChange}
                            /> :
                            <p>{numeral(service.costo).format('$0.00')}</p>
                        }
                    </div>
                </form>
                <div className="buttons">
                    <button className="cancel" onClick={handleDelete}>Eliminar</button>
                    {/* {
                        editMode ? <button 
                            className="cancel" 
                            type="button"
                            onClick={() => setEditMode(false)}
                        >Cancelar</button>
                        : <button 
                            type="button"
                            onClick={() => setEditMode(true)}
                        >Editar</button>
                    } */}
                </div>
            </ServiceContainer>
        }
    </Modal>
  );
}

export default Service;