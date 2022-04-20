import styled from 'styled-components';

export const UsersContainer = styled.div`
    width: 100%;
    
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
            box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
            background: ${props => props.isDark ? '#282828' : '#FFF'};
            color: #417493;
            cursor: pointer;
            user-select: none;
            transition: all .3s ease;

            &:hover {
                background: #417493;
                color: #eee;
            }
        }
    }

    & > .main-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 50px;

        & > .user {
            position: relative;
            width: 100%;
            height: 100px;
            background: ${props => props.isDark ? '#222' : '#FFF'};
            box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
            border-radius: 25px;
            padding: 10px 25px;
            margin-bottom: 15px;
            color: ${props => props.isDark ? '#999' : '#666'};

            & > .user-header {
                display: flex;
                justify-content: space-between;
                width: 100%;
                font-size: 16px;

                & > .name {
                    font-weight: bold;
                    color: #417493;
                }

                & > .date {
                }
            }

            & > .user-info-preview {
                & > .type {
                    font-size: 14px;
                }
                & > .status {
                    margin-top: 25px;
                    font-size: 15px;
                }
            }

            & > .buttons {
                display: flex;
                position: absolute;
                right: 25px;
                bottom: 10px;
                
                & > button {
                    display: flex;
                    align-items: center;
                    padding: 5px 15px;
                    border-radius: 15px;
                    border: none;
                    background: ${props => props.isDark ? '#213A4A' : '#417493'};
                    color: #eee;
                    font-weight: bold;
                    cursor: pointer;

                    &.delete {
                        background: #A93226;
                    }

                    &:first-child {
                        margin-right: 15px;
                    }
                }
            }

        }
        
        /* & > .container-box {
            position: relative;
            width: 350px;
            height: 500px;
            padding: 20px;
            border-radius: 25px;
            box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, .1);
            overflow: hidden;

            & > .image-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 200px;
                & > img {
                    width: 100%;
                    height: 100%;
                }
            } 

            & > .user-container{
                margin-top: 200px;
                height: 220px;
            }

            & > .buttons {
                    display: flex;
                    justify-content: space-evenly;
                    width: 100%;
                    padding: 15px 0;

                    & > button {
                        padding: 5px 0;
                        width: 100px;
                        border: none;
                        border-radius: 15px;
                        color: #eee;
                    }

                    & > .edit {
                        background: #417493;
                    }

                    & > .delete {
                        background: #A93226;
                    }
                }

            & > .users {
                width: 100%;
                height: 100%;
                overflow-y: auto;

                & > .user {
                    position: relative;
                    width: 100%;
                    height: 90px;
                    padding: 5px 15px;
                    margin-bottom: 15px;
                    border: 1px solid #417493;
                    border-radius: 20px;

                    & > .user-header {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        font-size: 14px;

                        & > .name {
                            font-weight: bold;
                            color: #417493;
                        }

                        & > .date {
                            color: #666;
                        }
                    }

                    & > .user-info-preview {
                        & > .type {
                            font-size: 13px;
                            color: #666;
                        }
                        & > .status {
                            margin-top: 15px;
                            font-size: 14px;
                            color: #666;
                        }
                    }

                    & > button {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100px;
                        right: 15px;
                        bottom: 10px;
                        padding: 3px 15px;
                        border-radius: 15px;
                        border: none;
                        background: #417493;
                        color: #eee;
                        cursor: pointer;
                    }
                }
            }
        } */
    }
`;

export const Confirm = styled.div`
    width: 100%;
    height: 100px;

    & > .info {
        height: 70%;
        padding: 10px;
        color: ${props => props.isDark ? '#FFF' : '#444'};
        font-size: 14px;
    }

    & > .buttons {
        height: 30%;
        display: flex;
        justify-content: space-evenly;

        & > button {
            padding: 5px 15px;
            border: none;
            border-radius: 20px;
            background: #417493;
            color: #fff;
            font-weight: bold;
            cursor: pointer;

            &.cancel {
                background: #A93226;
            }
        }
    }
`;