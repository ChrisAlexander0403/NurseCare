import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

export const Nav = styled.nav`
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-shadow: ${props => props.isDark ? '2px 0 10px 5px #111' : '2px 0 10px 5px #ddd'};
    background: ${props => props.isDark ? '#181818' : '#eee'};
    transition: all .3s ease;

    & > a {
        margin-left: 50px;
        font-size: 28px;
        font-weight: 700;
        color: #417493;
        width: 80px;
        height: 60px;

        & > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    & ul{
        display: flex;
        align-items: center;
    }

    & ul li{
        list-style: none;
        margin: 0 10px;
    }

    & ul li a{
        padding: 5px 10px;
        border-radius: 10px;
        color: ${props => props.isDark ? '#eee' : '#242424'};
        &:hover {
            color: #417493;
        }
    }

    & ul li a.active{
        color: #417493;
    }

    & ul li .user {
        font-weight: bold;
        cursor: pointer;
        color: ${props => props.isDark ? '#eee' : "#3d3d3d"};
        &:hover {
            color: #417493;
        }
    }
`;

export const ThemeDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75px; 
    user-select: none;
    
    @media screen and (max-width: 1080px){
        margin: 1rem 0 5rem 0;
    }

    @media screen and (max-width: 480px){
        width: 90px;
    }
`;

export const Switch = styled.input`
    position: relative;
    width: 40px;
    height: 20px;
    background: #c6c6c6;
    border-radius: 10px;
    outline: none;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    transition: .5s;
    cursor: pointer;
    user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:checked{
        background: #0082cc;
    }

    &:before{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        top: 0;
        left: 0;
        background: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        transform: scale(1.1);
        transition: .5s;
        user-select: none;
    }

    &:checked:before{
        left: 20px;
        user-select: none;
    }
`;

export const Sun = styled(FaSun)`
    color: #ffef00;
    font-size: 25px;
    @media screen and (max-width: 480px){
        font-size: 35px;
    }
`;

export const Moon = styled(FaMoon)`
    color: #fff;
    font-size: 20px;
    @media screen and (max-width: 480px){
        font-size: 30px;
    }
`;