import styled from 'styled-components';

export const ClientsContainer = styled.div`
    width: 100%;

    & > h1 {
        color: #417493;
    }

    & > .main-container {
        display: flex;
        flex-wrap: wrap-reverse;
        justify-content: space-evenly;
        margin: 30px;
        
        /* & > .container-box {
            position: relative;
            width: 350px;
            height: 500px;
            padding: 20px;
            border-radius: 25px;
            box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, .2);
            overflow-y: auto;
            margin-bottom: 25px;

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
            } */

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

                & > .user-info-container {
                    font-size: 14px;
                    color: ${props => props.isDark ? '#999' : '#666'};

                    & > .name {
                        color: #417493;
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
            }

            & > .buttons {
                display: flex;
                justify-content: space-evenly;
                width: 100%;
                padding: 15px 0;

                & > button {
                    padding: 5px 0;
                    width: 90px;
                    border: none;
                    border-radius: 15px;
                    color: #eee;
                    cursor: pointer;
                }

                & > .edit {
                    background: ${props => props.isDark ? '#213A4A' : '#417493'}; 
                }

                & > .delete {
                    background: #A93226;
                }
            }

            & > .clients {
                width: 100%;
                height: 100%;

                & > .client {
                    margin: 0 auto 15px;
                    position: relative;
                    width: 95%;
                    height: 90px;
                    padding: 5px 15px;
                    box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, .2);
                    border-radius: 20px;

                    & > .client-header {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        font-size: 16px;

                        & > .name {
                            font-weight: bold;
                            color: #417493;
                        }

                        & > .date {
                            color: #666;
                        }
                    }

                    & > .client-body {
                        & > .address {
                            margin-top: 2px;
                            font-size: 14px;
                            color: ${props => props.isDark ? '#999' : '#666'};
                        }
                    }

                    & > .status {
                        position: absolute;
                        bottom: 15px;
                        color: #417493;
                    }

                    & > .blocked {
                        color: #A93226;
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
                        background: ${props => props.isDark ? '#213A4A' : '#417493'}; 
                        color: #eee;
                        cursor: pointer;
                    }
                }
            }
        
    }
`;