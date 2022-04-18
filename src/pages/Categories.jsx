import React, { useEffect, useState, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import { CategoriesContainer, Create } from '../styles/CategoriesStyles';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import InputFile from '../components/inputProfile/InputFile';
import useForm from '../hooks/useForm';
import { createCategory, getCategories } from '../requests/CategoriesRequests';
import categoryValidate from '../utils/validations/categoryValidate';

const Categories = () => {

  const [catalogs, setCatalogs] = useState([]);
  const [values, setValues] = useState({
    image: '',
    name: ''
  });
  const [icon, setIcon] = useState("");
  
  let [isOpen, openModal, closeModal] = useModal(false);
  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);
  let navigate = useNavigate();

  let formRef = useRef(null);

  const updateUploadedFiles = (files) => setIcon(files);
  const updateUploadedFilesInBase64 = (files) => setValues({ ...values, image: files });

  const submitForm = async ({ name, image }) => {
    let response = await createCategory(session.id, name, image, session.apikey)
    if(response.status === 'success') {
      let response = await getCategories(session.id, session.apikey);
      setCatalogs(response.datos);
    }
    closeModal();
  }

  const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, categoryValidate);

  useEffect(() => {
    const getCatalogs = async () => {
      let response = await getCategories(session.id, session.apikey);
      setCatalogs(response.datos);
    }
    getCatalogs();
    //eslint-disable-next-line
  }, []);
  

  return (
    <>
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      type='cancel'
      imporant={true}
      background={isDark ? '#181818' : '#EEE'}
      color={'#417493'}
    >
      <Create isDark={isDark}>
          <p className="title">Agregar categoría</p>
          <form onSubmit={handleSubmit} ref={formRef} className="create-form">
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
              <label htmlFor="title">Nombre de la categoría</label> 
              <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Servicio" 
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Guardar</button>
          </form>
        </Create>
    </Modal>
      <CategoriesContainer isDark={isDark}>
        <aside>
            <section>
              <div className='options'>
                <button className='create' onClick={openModal}>
                  <AiOutlinePlus style={{ fontSize: '18px' }} />
                  <p>Crear &nbsp;</p>
                </button>
              </div>
            </section>
          </aside>
          <article>
            <section>
              <div className="catalogs">
                {catalogs.map((catalog) => {
                  return (
                    <div className="catalog" key={catalog.idCatego} onClick={() => navigate(catalog.idCatego)}>
                        {catalog.icono 
                          ? <div className="img-container">
                              <img src={`http://thenursecare.com/Demo/${catalog.icono}`} alt={catalog.nombre} /> 
                            </div>
                          : <AiOutlineMedicineBox 
                              style={{ 
                                fontSize: '60px', 
                                color:`${isDark ? '#FFF' : '#417493'}` }}
                            />
                        }
                        <p className="name">{catalog.nombre}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          </article>
      </CategoriesContainer>
    </>
  );
}

export default Categories;