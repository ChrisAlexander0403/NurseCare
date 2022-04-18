import styled from 'styled-components';

export const OrdersContainer = styled.div`
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
                    font-size: 14px;

                    & > .title {
                        font-weight: bold;
                        color: #417493;
                    }

                    & > .date {
                        color: ${props => props.isDark ? '#888' : '#666'};
                    }
                }

                & > .body {
                    font-size: 13px;
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
                        margin-left: 10px;
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
    }
}
`;