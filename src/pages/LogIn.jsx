import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import XMLParser from 'react-xml-parser';
import { useDispatch, useSelector } from 'react-redux';
import { selectSession } from '../features/slices/sessionSlice';

import '../styles/login.scss';
import useForm from '../hooks/useForm';
import logInValidate from '../utils/validations/logInValidate';
import { login } from '../features/slices/sessionSlice';

const getXmls = (email, password) => {
    return (`<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:demo="http://thenursecare.com/Demo/">
                <soapenv:Header/>
                <soapenv:Body>
                    <demo:LoginNurse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                        <user xsi:type="xsd:string">${email}</user>
                        <password xsi:type="xsd:string">${password}</password>
                        <apikey xsi:type="xsd:string">123</apikey>
                    </demo:LoginNurse>
                </soapenv:Body>
            </soapenv:Envelope>`);
}

              //admin@admin.mail
              //12345678a

const LogIn = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const session = useSelector(selectSession);

    const submitForm = async ({ email, password }) => {

        let xmls = getXmls(email, password);

        try {
            const data = await axios.post('http://thenursecare.com/Demo/WSPortalDemo.php?wsdl', 
                xmls, { withCredentials: false }, {
                    headers: {
                        'Content-Type': 'text/xml'
                    }
            });
            let xml = new XMLParser().parseFromString(data.data);
            let LoginNurseReturn = xml.getElementsByTagName('LoginNurseReturn');
            let response = JSON.parse(LoginNurseReturn[0].value);
            console.log(response);

            if (response.status === 'success') {
                dispatch(login({
                    id: response.idUser,
                    name: response.nombre,
                    rol: response.rol,
                    apikey: response.apiKey
                }));
                navigate('/', { replace: true });
            } else if(response.status === 'error'){
                setError(response.mensaje);
            } else {
                setError('Parece que ocurrió un problema, por favor contacte a soporte');
            }
        } catch(err) {
            console.log(err);
        }
    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, logInValidate);

    useEffect(() => {
        if (session) {
            navigate('/', { replace: true });
        }
    });

    return (
        <div className="container">
            <picture>
                <img src="assets/logo.jpeg" alt="Nurse Care" />
            </picture>
            <form onSubmit={handleSubmit}>
                <p>Iniciar sesión</p>
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input 
                        id='email'
                        type='text'
                        placeholder='Correo'
                        name='email'
                        value={values.email.replace(/\s+/g, '')}
                        onChange={handleChange}
                    />
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        id='password'
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                {errors.password && <span className="error">{errors.password}</span>}
                {error && <span className="error">{error}</span>}
                <button type='submit'>Iniciar sesión</button>
            </form>
        </div>
    );

}

export default LogIn;