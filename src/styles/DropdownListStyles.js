import styled from "styled-components";
import { MdArrowDropDown } from 'react-icons/md';

export const DropdownList = styled.div`
    width: 100%;
    position: relative;
    user-select: none;

    & > button {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #417493;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 14px;
        border-bottom: #417493 1px solid;
        font-weight: bold;
        border: 1px solid #417493;
        border-radius: 20px;
        background: ${props => props.isDark ? '#282828' : '#FFF'};
    }
`;

export const Arrow = styled(MdArrowDropDown)`
    font-size: 20px;
    color: #417493;
`;

export const DropdownContent = styled.div`
    top: 110%;
    position: absolute;
    background: ${props => props.isDark ? '#181818' : '#eee'};
    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .3)' : '2px 2px 5px 5px rgba(0, 0, 0, .1)'};
    font-weight: 500;
    width: 100%;
    z-index: 2;
    max-height: 150px;
    border-radius: 25px;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
        background: #417493;
        border-radius: 4px;
    }
    &::-webkit-scrollbar {
        width: 10px;
        background: ${props => props.isDark ? '#383838' : '#ccc'};
    }

    & > .item {
        position: relative;
        padding: 15px;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
        z-index: 2;
        &:hover{
            background: ${props => props.isDark ? '#282828' : '#EEE'};
        }
    }
`;