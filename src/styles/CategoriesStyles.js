import styled from 'styled-components';

export const CategoriesContainer = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;

    & aside {
        & > section {
            & > .options {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 25px;

                & > .space {
                    width: 90px;
                }

                & > .title {
                    color: ${props => props.isDark ? '#999' : '#666'};
                    font-weight: bold;
                    font-size: 18px;
                }

                & > .create {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 90px;
                    padding: 5px 0;
                    border-radius: 20px;
                    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
                    background: ${props => props.isDark ? '#282828' : '#FFF'};
                    color: #417493;
                    cursor: pointer;
                    user-select: none;
                    border: none;
                    outline: none;
                    font-size: 16px;
                    transition: all .3s ease;

                    &:hover {
                        background: ${props => props.isDark ? '#213A4A' : '#417493'};
                        color: #eee;
                    }

                    @media screen and (max-width: 480px) {
                        visibility: hidden;
                    }
                }
            }
        }
    }
    & .catalogs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20px;

        @media screen and (max-width: 480px) {
            padding: 20px 0;
            flex-direction: column;
            align-items: center;
            flex-wrap: nowrap;
        }
        
        & > .catalog {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 30px 20px;
            width: 170px;
            height: 170px;
            box-shadow: ${props => props.isDark ? '2px 2px 5px 2px rgba(0, 0, 0, .3)' : '2px 2px 5px 2px rgba(0, 0, 0, .1)'};
            background: ${props => props.isDark ? '#282828' : '#FFF'};
            border-radius: 25px;
            transition: all .3s ease;
            cursor: pointer;

            & > button {
                position: absolute;
                right: 10px;
                top: 10px;
                border: none;
                outline: none;
                background: none;
                color: ${props => props.isDark ? '#999' : '#666'};
                font-size: 18px;
                cursor: pointer;

                &:hover {
                    color: #A93226;
                }
            }

            & > .img-container {
                width: 100px;
                height: 100px;
                & > img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            & > p {
                color: ${props => props.isDark ? '#FFF' : '#417493'};
                font-weight: bold;
                margin-top: 20px;
                transition: all .3s ease;
            }

            &:hover {
                transform: scale(1.05);
            }
        }
    }
    
`;

export const CreateButton = styled.button`
    position: absolute;
    right: 15px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
    background: ${props => props.isDark ? '#282828' : '#FFF'};
    color: #417493;
    cursor: pointer;
    user-select: none;
    border: none;
    outline: none;
    transition: all .3s ease;
    z-index: 3;

    &:hover {
        background: ${props => props.isDark ? '#213A4A' : '#417493'};
        color: #eee;
    }
`;

export const Create = styled.div`
    position: relative;
    color: #417493;
    height: 380px;
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

            & > textarea {
                padding: 5px 10px;
                border: none;
                border-radius: 15px;
                resize: none;
                background: ${props => props.isDark ? '#282828' : '#FFF'};
                color: ${props => props.isDark ? '#FFF' : '#000'};
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