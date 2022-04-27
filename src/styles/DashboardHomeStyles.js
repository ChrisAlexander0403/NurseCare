import styled from "styled-components";

export const DashboardHomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > div {
        margin-bottom: 30px;
    }
    
    & > .bar {
        width: 700px;
    }

    & > .pie {
        width: 700px;
        height: 550px;
    }

    & > .details {
        

        & > h3 {
            color: #417493;
        }
        
        & > ul {
            list-style: none;
            margin: 15px;

            & > li {
                margin-top: 5px;
                & > div {
                    display: flex;
                    width: 300px;

                    & > p {
                        font-size: 14px;
                        color: ${props => props.isDark ? '#CBCBCB' : '#242424'};
                    }

                    & > p:first-child {
                        font-weight: 600;
                    }
                }
            }
        }
    }
`