import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Switch, ThemeDiv } from '../components/navbar/NavBarStyles';
import { selectTheme, switchTheme, changeFont, selectFont } from '../features/slices/themeSlice';
import { Arrow, DropdownContent, DropdownList } from '../styles/DropdownListStyles';
import { SettingsMainContainer } from '../styles/SettingsMainStyles';
import useWindowsDimensions from '../hooks/useWindowsDimensions';

const fonts = [
  {
    id: 0,
    name: 'Raleway',
    css: "'Raleway', sans-serif"
  },
  {
    id: 1,
    name: 'Montserrat',
    css: "'Montserrat', sans-serif"
  },
  {
    id: 2,
    name: 'Roboto',
    css: "'Roboto', sans-serif"
  },
  {
    id: 3,
    name: 'Lato',
    css: "'Lato', sans-serif"
  },
  {
    id: 4,
    name: 'Source Sans Pro',
    css: "'Source Sans Pro', sans-serif"
  },
  {
    id: 5,
    name: 'Poppins',
    css: "'Poppins', sans-serif"
  },
  {
    id: 6,
    name: 'Nunito Sans',
    css: "'Nunito Sans', sans-serif"
  },
  {
    id: 7,
    name: 'Barlow',
    css: "'Barlow', sans-serif"
  },
  {
    id: 8,
    name: 'Sarabun',
    css: "'Sarabun', sans-serif"
  },
  {
    id: 9,
    name: 'Source Serif Pro',
    css: "'Source Serif Pro', serif"
  },
  {
    id: 10,
    name: 'Cormorant Garamond',
    css: "'Cormorant Garamond', serif"
  }
];

const SettingsMain = () => {

  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState('');
  const [device, setDevice] = useState('');

  let dispatch = useDispatch();
  let isDark = useSelector(selectTheme);
  let actualFont = useSelector(selectFont);
  let switchRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  let { height, width } = useWindowsDimensions();

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

  useEffect(() => {
    
    setSelected(actualFont.name);
  }, [actualFont]);
  

  useEffect(() => {
    switchRef.current.addEventListener('click', () => {
        dispatch(switchTheme());
    });
    // eslint-disable-next-line
  }, []);

  return (
    <SettingsMainContainer isDark={isDark}>
      <div className="options">
        <div className="option">
          <p>Tema oscuro</p>
          <ThemeDiv>
            { 
              !isDark ? <Sun />
              : <Moon />
            }
            <Switch 
              type="checkbox" 
              name=""
              ref={switchRef}
              defaultChecked={isDark && true}
            />
          </ThemeDiv>
        </div>
        <div className="option">
          <p>Fuente</p>
          <div style={{ width: device!== 'mobile' ? '250px' : '150px' }}>
            <DropdownList isDark={isDark}>
              <button type='button' onClick={() => setIsActive(!isActive)}>{selected}<Arrow /></button>
              {isActive && (
                <DropdownContent isDark={isDark}>
                  {fonts.map((font, index) => {
                    return (
                      <div key={index} className="item" onClick={() => { 
                        setSelected(font.name);
                        setIsActive(false);
                        dispatch(changeFont({ name: font.name, css: font.css }));
                      }}>
                        {font.name}
                      </div>
                    );
                  })}
                </DropdownContent>
              )}
            </DropdownList>
          </div>
        </div>
      </div>
    </SettingsMainContainer>
  );
}

export default SettingsMain;