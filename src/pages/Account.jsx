import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectSession } from '../features/slices/sessionSlice';
// import { selectTheme } from '../features/slices/themeSlice';
import { getUserRequest } from '../requests/UserRequests';

const Account = () => {

  let session = useSelector(selectSession);
  // let isDark = useSelector(selectTheme);

  useEffect(() => {

    const getUser = async () => {
      let response = await getUserRequest(session.id, session.id, session.apikey);
    }
    getUser();
  
    return () => {
    }

    //eslint-disable-next-line
  }, []);
  

  return (
    <div>Account</div>
  )
}

export default Account