import styled from "styled-components";
import { MdArrowDropDown } from 'react-icons/md';

export const ServicesStyles = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;

    & aside {
        & > section {
            & > .options {
                width: 100%;
                height: 25px;
                margin-bottom: 25px;

                & > .go-back {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 30px;
                    color: ${props => props.isDark ? '#999' : '#666'};
                    font-weight: bold;
                    font-size: 18px;
                    cursor: pointer;
                    
                    &:hover {
                        color: ${props => props.isDark ? '#ccc' : '#333'};
                    }
                }

                & > .create {
                    font-size: 16px;
                    display: inline-flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 90px;
                    padding: 5px 0;
                    border-radius: 20px;
                    box-shadow: ${props => props.isDark ? '2px 2px 5px 2px rgba(0, 0, 0, .3)' : '2px 2px 5px 2px rgba(0, 0, 0, .1)'};
                    background: #eee;
                    color: #417493;
                    background: ${props => props.isDark ? '#181818' : '#EEE'};
                    cursor: pointer;
                    user-select: none;
                    transition: all .3s ease;
                    border: none;
                    outline: none;

                    &:hover {
                        background: ${props => props.isDark ? '#213A4A' : '#417493'};
                        color: #eee;
                    }
                }
            }
        }
    }
`;

export const ServicesContainer = styled.div`
    width: 100%;

    & > .main-container {
        display: flex;
        justify-content: space-evenly;    
        margin: 0 30px; 

        & > .container-box {
            position: relative;
            width: 350px;
            height: 500px;
            padding: 20px;
            border-radius: 25px;
            box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .2)' : '2px 2px 5px 5px rgba(0, 0, 0, .1)'};
            overflow-y: auto;

            &:first-child {
                box-shadow: inset 2px 2px 5px 5px rgba(0, 0, 0, .2);
            }
            
            &::-webkit-scrollbar-thumb {
                background: #417493;
                border-radius: 4px;
            }
            &::-webkit-scrollbar {
                width: 10px;
                background: ${props => props.isDark ? '#383838' : '#ccc'};
                margin-bottom: 10px; 
                margin-top: 10px;
            }

            & > .services {
                width: 100%;
                height: 100%;

                & > .service {
                    position: relative;
                    display: flex;
                    width: 100%;
                    height: 90px;
                    padding: 0;
                    margin-bottom: 15px;
                    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .2)' : '2px 2px 5px 5px rgba(0, 0, 0, .1)'};
                    border-radius: 20px;
                    overflow: hidden;

                    & > .img-container {
                        width: 120px;
                        height: 90px;

                        & > img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    & > .service-info {
                        width: 100%;
                        height: 90px;
                        padding: 5px 10px;

                        & > .service-header {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            font-size: 14px;

                            & > .title {
                                font-weight: bold;
                                color: #417493;
                            }

                            & > .price {
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const Create = styled.div`
    position: relative;
    color: #417493;
    height: 460px;
    width: 100%;

    & > .title {
        font-weight: 600;
    }

    .create-form {
        padding: 25px 10px 15px;
        width: 100%;

        & > .form-group {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-top: 10px;

            &:first-child {
                margin-top: 0;
            }

            & > label {
                margin: 0 10px 2px;
                font-size: 14px;
                user-select: none;
            }

            & > input {
                padding: 5px 10px;
                border: none;
                border-radius: 15px;
                background: ${props => props.isDark ? '#282828' : '#FFF'};
                color: ${props => props.isDark ? '#FFF' : '#000'};
                &:focus{
                    outline: 1px solid #417493;
                }
            }

            & > .error {
                margin: 0 10px 2px;
                font-size: 14px;
                user-select: none;
                color: red;
            }

            & > textarea {
                padding: 5px 10px;
                border: none;
                border-radius: 15px;
                background: ${props => props.isDark ? '#282828' : '#FFF'};
                color: ${props => props.isDark ? '#FFF' : '#000'};
                resize: none;
                &:focus{
                    outline: 1px solid #417493;
                }
            }
        }

        & > button {
            position: absolute;
            bottom: 0;
            right: 10px;
            border: none;
            background: none;
            cursor: pointer;
            color: #417493;
        }

        & > .error {
            font-size: 14px;
            color: red;
        }
    }
`;

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