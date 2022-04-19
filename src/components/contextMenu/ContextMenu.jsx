import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/slices/themeSlice';
import useContextMenu from '../../hooks/useContextMenu';
import { ContextMenuContainer } from './contextMenuStyles';

const ContextMenu = ({ children }) => {

    let isDark = useSelector(selectTheme);
    const { anchorPoint, show } = useContextMenu();

    return show ? 
        (<ContextMenuContainer
            style={{
                top: anchorPoint.y,
                left: anchorPoint.x
            }}
            isDark={isDark}
        >
            {children}
        </ContextMenuContainer>) : null;
}

export default ContextMenu;