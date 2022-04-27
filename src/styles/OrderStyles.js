import styled from 'styled-components';

export const OrderContainer = styled.div`
    & > .order {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px 10px 0;

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
                color: ${props => props.isDark ? '#999' : '#444'};

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
                    border-radius: 15px;
                    overflow: hidden;

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
                            color: ${props => props.isDark ? '#999' : '#444'};
                            & > span {
                                font-weight: bold;
                                color: #417493;
                            }
                        }
                    }
                }
            }
            & > .options {
                display: flex;
                justify-content: flex-end;
                margin-top: 20px;

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
`;