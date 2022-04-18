import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectSession } from '../../features/slices/sessionSlice';

const PrivateRoute = ({ children }) => {

    const session = useSelector(selectSession);
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            if (!session.apikey) navigate('/login', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [session, navigate]);
    
    return children;
}

export default PrivateRoute;