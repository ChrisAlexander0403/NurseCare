import styled from "styled-components";

export const DashboardHomeContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-auto-rows: 400px 120px;
    grid-template-areas: "bar pie"
                         "details details";
    grid-gap: 50px 0;
    
    & > .bar {
        grid-area: bar;
    }

    & > .pie {
        grid-area: pie;
    }

    & > .details {
        grid-area: details;

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