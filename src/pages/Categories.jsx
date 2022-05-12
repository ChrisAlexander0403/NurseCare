/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import { CategoriesContainer, Create, CreateButton } from '../styles/CategoriesStyles';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { RiDeleteBackFill } from 'react-icons/ri';
import InputFile from '../components/inputProfile/InputFile';
import useForm from '../hooks/useForm';
import categoryValidate from '../utils/validations/categoryValidate';
import { Confirm } from '../styles/UsersStyles';
import { createCatalogXmls, deleteCategoryXmls, getCatalogsXmls } from '../XMLRequests/catalogsRequests';
import useXMLRequest from '../hooks/useXMLRequest';
import useWindowsDimensions from '../hooks/useWindowsDimensions';
// import ContextMenu from '../components/contextMenu/ContextMenu';

const Categories = () => {

  const [catalogs, setCatalogs] = useState([]);
  const [values, setValues] = useState({
    image: '',
    name: ''
  });
  const [icon, setIcon] = useState("");
  const [options, setOptions] = useState([]);
  const [delitingCategory, setDelitingCategory] = useState();
  const [device, setDevice] = useState('');
  
  let [isOpen, openModal, closeModal] = useModal(false);
  const [confirmIsOpen, openConfirmModal, closeConfirmModal] = useModal(false);
  let session = useSelector(selectSession);
  let isDark = useSelector(selectTheme);
  let navigate = useNavigate();
  const request = useXMLRequest();
  let { height, width } = useWindowsDimensions();

  let formRef = useRef(null);

  const updateUploadedFiles = (files) => setIcon(files);
  const updateUploadedFilesInBase64 = (files) => setValues({ ...values, image: files });

  const submitForm = async ({ name, image }) => {
    let xmls = createCatalogXmls(session.id, name, image, session.apikey);
    let response = await request(xmls, 'InsertCategoNurseReturn')
    if(response.status === 'success') {
      xmls = getCatalogsXmls(session.id, session.apikey);
      response = await request(xmls, 'GetCategosNurseReturn');
      setCatalogs(response.datos);
    }
    closeModal();
  }

  const handleDelete = async (id) => {
    let xmls = deleteCategoryXmls(session.id, id, session.apikey);
    let response = await request(xmls, 'RemoveCategoPortNurseReturn');
    if (response.status === 'success') {
      xmls = getCatalogsXmls(session.id, session.apikey);
      response = await request(xmls, 'GetCategosNurseReturn');
      setCatalogs(response.datos);
      closeConfirmModal();
    }
  }

  const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, categoryValidate);

  useEffect(() => {
    const getCatalogs = async () => {
      let xmls = getCatalogsXmls(session.id, session.apikey);
      let response = await request(xmls, 'GetCategosNurseReturn');
      setCatalogs(response.datos);
      console.log(response);
    }
    getCatalogs();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setOptions(document.querySelectorAll('.catalog'));
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
    {/* <ContextMenu options={options}>

    </ContextMenu> */}
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
                placeholder="Categoría" 
                value={values.name}
                onChange={handleChange}
              />
            </div>
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
            <p>¿Seguro que deseas eliminar esta categoría?</p>
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
              <button onClick={(e) => handleDelete(delitingCategory)}>Eliminar</button>
              <button className='cancel' onClick={closeConfirmModal}>Cancelar</button>
          </div>
        </Confirm>
      </Modal>
      <CategoriesContainer isDark={isDark}>
        { device === 'mobile' &&
          <CreateButton isDark={isDark} onClick={openModal}>
            <AiOutlinePlus style={{ fontSize: '24px' }} />
            {/* <p>Crear &nbsp;</p> */}
          </CreateButton>
        }
        <aside>
            <section>
              <div className='options'>
                <div className="space"></div>
                <div className="title">Categorías</div>
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
                {catalogs && catalogs.map((catalog) => {
                  return (
                    <div id='catalog' className="catalog" key={catalog.idCatego} onClick={() => navigate(catalog.idCatego)}>
                        <button 
                          className='delete'
                          onClick={(e) => { e.stopPropagation(); setDelitingCategory(catalog.idCatego); openConfirmModal();}}
                        ><RiDeleteBackFill /></button>
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