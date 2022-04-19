import styled from 'styled-components';

export const ContextMenuContainer = styled.div`
    position: absolute;
    z-index: 100;
    font-size: 14px;
    background: ${props => props.isDark ? '#282828' : '#FFF'};
    border-radius: 15px;
    padding: 5px 0 5px 0;
    min-width: 150px;
    min-height: 50px;
    margin: 0;
    list-style: none;
    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
    opacity: 1;
    transition: opacity 0.5s linear;
`;