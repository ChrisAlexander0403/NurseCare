import styled from "styled-components";
import { MdArrowDropDown } from 'react-icons/md';

export const DropdownListContainer = styled.div`
    width: 100%;
    position: relative;
    user-select: none;

    & > button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 15px;
        font-size: 15px;
        border-bottom: #417493 1px solid;
        font-weight: bold;
    }
`;

export const Arrow = styled(MdArrowDropDown)`
    font-size: 20px;
    color: #417493;
`;

export const DropdownContent = styled.div`
    top: 110%;
    position: absolute;
    background: #eee;
    box-shadow: 3px 3px 10px 6px #00000060;
    font-weight: 500;
    width: 100%;
    z-index: 2;
    height: 300px;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
        background: #ffef00;
        border-radius: 4px;
    }
    &::-webkit-scrollbar {
        width: 10px;
        background: #3d3d3d;
    }

    & > .item {
        position: relative;
        padding: 15px;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
        z-index: 2;
        &:hover{
            background: #777;
        }
    }
`;