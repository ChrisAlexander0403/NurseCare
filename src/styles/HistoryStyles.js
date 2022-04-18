import styled from 'styled-components';

export const HistoryContainer = styled.div`
    width: 100%;

    & > h1 {
        color: #417493;
    }

    & > .main-container {
        display: flex;
        justify-content: space-evenly;
        margin: 40px 30px;
        
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
                    
                    & > .info {
                        position: relative;
                        font-size: 12px;
                        width: 70%;
                        padding: 5px 10px;

                        & > .header {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            font-size: 14px;

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
                        }
                        & > button {
                            position: absolute;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 100px;
                            right: 5px;
                            bottom: 5px;
                            padding: 3px 15px;
                            border-radius: 15px;
                            border: none;
                            background: #417493;
                            color: #eee;
                            cursor: pointer;
                        }
                    }
                    
                    & > .status {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 30%;
                        font-size: 22px;

                        & > p {
                            font-size: 12px;
                        }
                    }

                    & > .checked {
                        background: #BCE5B5;
                        color: #4CBA3B;
                    }
                    
                    & > .canceled {
                        background: #D49993;
                        color: #A93226;
                    }
                }
            }
        }
    }
`;