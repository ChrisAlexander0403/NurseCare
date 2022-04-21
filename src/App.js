import { Helmet } from 'react-helmet';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import './fonts.css';
import ScrollToTop from './hooks/useScrollToTop';
import NavBar from './components/navbar/NavBar';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import ServicesDashboard from './pages/ServicesDashboard';
import { useSelector } from 'react-redux';
import { selectFont, selectTheme } from './features/slices/themeSlice';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${props => props.font.css};
    /* font-family: 'Raleway', sans-serif; */
    /* font-family: 'Montserrat', sans-serif; */
    /* font-family: 'Roboto', sans-serif; */
    /* font-family: 'Lato', sans-serif; */
    /* font-family: 'Source Sans Pro', sans-serif; */
    /* font-family: 'Poppins', sans-serif; */
    /* font-family: 'Nunito Sans', sans-serif; */
    /* font-family: 'Barlow', sans-serif; */
    /* font-family: 'Source Serif Pro', serif; */
    /* font-family: 'Cormorant Garamond', serif; */
    /* font-family: 'Sarabun', sans-serif; */
  }
  body{
    background: ${props => props.isDark ? '#181818' : '#EEE'};
    transition: background .3s ease;
    overflow: hidden;
  }
  a{
    text-decoration: none;
    color: #000;
  }
  header{
    grid-area: header;
  }
  footer {
    grid-area: footer;
  }
`;

function App() {

  let isDark = useSelector(selectTheme);
  let font = useSelector(selectFont);

  return (
    <>
      <GlobalStyle isDark={isDark} font={font} />
      <Helmet>
        <title>Nurse Care</title>
      </Helmet>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/login" exact element={<LogIn />} />
            <Route path="/register" exact element={<><h1>Hola</h1></>} />
            <Route path="/*" exact element={
              <>
                <header>
                  <NavBar />
                </header>
                <Routes>
                  <Route exact path="dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> 
                  <Route exact path="services/*" element={<PrivateRoute><ServicesDashboard /></PrivateRoute>} />
                  <Route exact path="categories/*" element={<PrivateRoute><Categories /></PrivateRoute>} /> 
                  <Route exact path="settings/*" element={<PrivateRoute><Settings /></PrivateRoute>} /> 
                  <Route exact path="/" element={<Navigate to="dashboard" />} /> 
                </Routes>
                <footer>

                </footer>
              </>
            } />
            <Route path="*" exact element={<><h1>Not found</h1></>}/>
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
