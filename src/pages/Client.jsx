import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/modal/Modal';
import { selectSession } from '../features/slices/sessionSlice';
import { selectTheme } from '../features/slices/themeSlice';
import useModal from '../hooks/useModal';
import { getClient } from '../requests/ClientsRequests';

const Client = () => {

    const [client, setClient] = useState();

    const navigate = useNavigate();
    let { id } = useParams();
    let session = useSelector(selectSession);
    let isDark = useSelector(selectTheme);

    const [isOpen, openModal, closeModal] = useModal(true, navigate);

    useEffect(() => {
        (async () => {
            let response = await getClient(session.id, id, session.apikey)
            setClient(response.datos[0]);
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

        </Modal>
    );
}

export default Client;