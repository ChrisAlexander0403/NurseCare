import styled from 'styled-components';

export const HistoryContainer = styled.div`
    width: 100%;

    & > h1 {
        color: #417493;
        margin-left: 20px;
    }

    & > .main-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 40px 30px;

        & > .filters {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-bottom: 30px;

            & > .search {
                width: 400px;
                height: 30px;
                border-radius: 20px;
                overflow: hidden;

                & > input {
                    height: 100%;
                    width: 90%;
                    padding: 2px 10px;
                    border: none;
                    outline: none;
                    background: ${props => props.isDark ? '#282828' : '#FFF'};
                    color: ${props => props.isDark ? '#999' : '#666'};
                }
                & > button {
                    height: 100%;
                    width: 10%;
                    border: none;
                    outline: none;
                    background: ${props => props.isDark ? '#282828' : '#FFF'};
                    color: ${props => props.isDark ? '#999' : '#666'};
                    border-left: ${props => props.isDark ? '1px solid #181818' : '1px solid #EEE'};
                }
            }
        }
        
        /* & > .container-box {
            position: relative;
            width: 400px;
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
            } */

            & > .orders {
                width: 100%;
                height: 100%;
                
                & > .order {
                    display: flex;
                    position: relative;
                    width: 100%;
                    height: 90px;
                    margin-bottom: 15px;
                    box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .2)' : '2px 2px 5px 5px rgba(0, 0, 0, .1)'};
                    border-radius: 20px;
                    overflow: hidden;
                    background: ${props => props.isDark ? '#282828' : '#FFF'};
                    
                    & > .info {
                        position: relative;
                        font-size: 14px;
                        width: 80%;
                        padding: 5px 15px;

                        @media screen and (max-width: 480px) {
                            width: 75%;
                        }

                        & > .header {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            font-size: 16px;

                            & > .title {
                                font-weight: bold;
                                color: #417493;
                                max-width: 100px;
                            }

                            & > .date {
                                color: ${props => props.isDark ? '#888' : '#666'};
                            }
                        }

                        & > .body {
                            color: ${props => props.isDark ? '#888' : '#666'};

                            & > .client {
                                width: 100%;
                                height: 30px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
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
                    
                    & > .status {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 20%;
                        font-size: 22px;

                        @media screen and (max-width: 480px) {
                            width: 25%;
                        }

                        & > p {
                            font-size: 12px;
                        }
                    }

                    & > .checked {
                        background: ${props => props.isDark ? '#4CBA3B' : '#BCE5B5'};
                        color: ${props => props.isDark ? '#BCE5B5' : '#4CBA3B'};
                    }
                    
                    & > .canceled {
                        background: ${props => props.isDark ? '#A93226' : '#D49993'};
                        color: ${props => props.isDark ? '#D49993' : '#A93226'};
                    }
                }
            }
        
    }
`;