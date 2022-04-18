import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Switch, ThemeDiv } from '../components/navbar/NavBarStyles';
import { selectTheme, switchTheme } from '../features/slices/themeSlice';
import { SettingsMainContainer } from '../styles/SettingsMainStyles';

const SettingsMain = () => {

  let dispatch = useDispatch();
  let isDark = useSelector(selectTheme);
  let switchRef = useRef(null);

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
      </div>
    </SettingsMainContainer>
  );
}

export default SettingsMain;