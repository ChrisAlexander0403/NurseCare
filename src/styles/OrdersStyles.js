import styled from 'styled-components';

export const OrdersContainer = styled.div`
    width: 100%;

    & > h1 {
        color: #417493;
    }

    & > .main-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin: 40px 30px;
        
        

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
            
            & > .orders {
                width: 100%;
                height: 100%;
                
                & > .order {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    width: 100%;
                    height: 90px;
                    margin-bottom: 15px;
                    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .2)' : '2px 2px 5px 5px rgba(0, 0, 0, .1)'};
                    border-radius: 20px;
                    overflow: hidden;
                    padding: 5px 15px;
                    
                    & > .header {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        font-size: 16px;

                        & > .title {
                            font-weight: bold;
                            color: #417493;
                        }

                        & > .date {
                            color: ${props => props.isDark ? '#888' : '#666'};
                        }
                    }

                    & > .body {
                        font-size: 14px;
                        color: ${props => props.isDark ? '#888' : '#666'};
                    }

                    & > .options {
                        display: flex;
                        justify-content: flex-end;

                        & > button {
                            border: none;
                            padding: 5px 10px;
                            color: #fff;
                            border-radius: 15px;
                            font-weight: bold;
                            margin: 0 10px 10px;
                            cursor: pointer;
                        }

                        & > .details {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 90px;
                            background: ${props => props.isDark ? '#213A4A' : '#417493'};
                        }

                        & > .accept {
                            background: ${props => props.isDark ? '#307425' : '#4CBA3B'};
                        }

                        & > .reject {
                            background: #A93226;
                        }
                    }
                }
            }

            & > .order {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;

                & > .img-container {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    overflow: hidden;

                    & > img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }

                & > .header {
                    color: #417493;
                    font-size: 20px;
                    font-weight: bold;
                    margin: 10px;
                }

                & > .body {
                    width: 100%;

                    & > .service {
                        margin-bottom: 10px;

                        & > p {
                            margin-bottom: 3px;

                            & > span {
                                color: #417493;
                                font-weight: bold;
                            }

                            &:nth-child(1) {
                                color: #417493;
                                font-weight: bold;
                            }
                        }

                    }

                    & > .client {
                        display: flex;
                        width: 100%;
                        height: 110px;

                        & > .img-container {
                            display: block;
                            width: 30%;
                            height: 100%;

                            & > img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }

                        & > .content {
                            display: block;
                            width: 70%;
                            height: 100%;
                            padding: 0 5px;

                            & > .content-line {
                                height: 36px;

                                &:nth-child(2) {
                                    height: 54px;
                                }

                                &:nth-child(3) {
                                    height: 18px;
                                }

                                & > p {
                                    color: ${props => props.isDark ? '#999' : '#666'};
                                    & > span {
                                        font-weight: bold;
                                        color: #417493;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        
    }
`;