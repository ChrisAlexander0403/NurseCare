import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

export const Nav = styled.nav`
    position: relative;
    z-index: 21;
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-shadow: ${props => props.isDark ? '2px 0 10px 5px #111' : '2px 0 10px 5px #ddd'};
    background: ${props => props.isDark ? '#181818' : '#eee'};
    transition: all .3s ease;

    & > .mobile {
        display: none;
        color: #417493;

        @media screen and (max-width: 1080px){
            display: block;
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 1.8rem;
            cursor: pointer;
        }
    }

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

        @media screen and (max-width: 786px) {
            margin-left: 0;
        }
    }

    & > ul{
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 24px;
        z-index: 12;
        transition: left 0.5s ease;
        background: ${props => props.isDark ? '#181818' : '#EEE'};

        @media screen and (max-width: 1080px){
            flex-direction: column;
            width: 100%;
            height: calc(100vh - 60px);
            position: fixed;
            top: 60px;
            left: -100%;
            &.active{
                left: 0;
            }
        }

        @media screen and (orientation: landscape) and (max-width: 1080px){
            height: 80vh;
            padding-bottom: 20px;
        }
    }

    & > ul > li{
        list-style: none;
        margin: 10px;

        @media screen and (max-width: 786px) {
            line-height: 30px;
        }
    }

    & > ul > li > a{
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
    width: 90px; 
    user-select: none;
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