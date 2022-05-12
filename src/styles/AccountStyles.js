import styled from 'styled-components';

export const AccountContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    & > .user {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .user-image {
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: #fff;

            &::before {
                position: absolute;
                z-index: -1;
                top: -6px;
                left: -6px;
                content: '';
                width: 212px;
                height: 212px;
                border-radius: 50%;
                background: ${props => props.isDark ? '#282828' : '#DDD'};
            }

            & > .img-container {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;

                & > img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        & > .header {
            margin-top: 10px;

            & > p {
                font-size: 22px;
                font-weight: bold;
                color: ${props => props.isDark ? '#fff' : '#444'};
            }
        }

        & > .content {
            width: 500px;
            margin-top: 20px;
            padding: 20px 0;
            border-radius: 25px;
            box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
            background: ${props => props.isDark ? '#222' : '#FFF'};

            @media screen and (max-width: 480px) {
                width: 100vw;
                margin-top: 30px;
                border-radius: 0;
            }

            & > .content-line {
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 10px 20px;
                border-bottom: ${props => props.isDark ? '3px solid #181818' : '3px solid #EEE'};
                color: ${props => props.isDark ? '#999' : '#666'};

                @media screen and (max-width: 480px) {
                    font-size: 14px;
                }

                &:last-child {
                    border: none;
                }
            }
        }
    }
`;