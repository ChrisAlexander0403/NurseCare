import styled from 'styled-components';

export const CategoriesContainer = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;

    & aside {
        & > section {
            & > .options {
                width: 100%;
                height: 25px;

                & > .create {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    width: 90px;
                    padding: 5px 0;
                    border-radius: 20px;
                    box-shadow: ${props => props.isDark ? '2px 2px 5px 2px rgba(0, 0, 0, .3)' : '2px 2px 5px 2px rgba(0, 0, 0, .1)'};
                    background: ${props => props.isDark ? '#181818' : '#EEE'};
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
                }
            }
        }
    }
    & .catalogs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        
        & > .catalog {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 30px 20px;
            width: 170px;
            height: 170px;
            box-shadow: ${props => props.isDark ? '2px 2px 5px 2px rgba(0, 0, 0, .3)' : '2px 2px 5px 2px rgba(0, 0, 0, .1)'};
            background: ${props => props.isDark ? '#222' : '#EEE'};
            border-radius: 25px;
            transition: all .3s ease;
            cursor: pointer;

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