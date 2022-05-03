import styled from 'styled-components';

export const ServiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;

    & > .service-image {
        position: relative;
        transform-style: preserve-3d;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: none;

        &::before {
            position: absolute;
            transform: translateZ(-1px);
            top: -6px;
            left: -6px;
            content: '';
            width: 192px;
            height: 192px;
            border-radius: 50%;
            background: ${props => props.isDark ? '#383838' : '#CCC'};
        }

        & > .img-container {
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${props => props.isDark ? '#282828' : '#EEE'};
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
    & > form {
        width: 100%;
        margin-top: 20px;
        color: ${props => props.isDark ? '#999' : '#666'};

        & > .content-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 10px;
            border-bottom: ${props => props.isDark ? '1px solid #666' : '1px solid #999'};

            & > p {
                text-align: right;
            }

            & > input {
                padding: 5px 10px;
                width: 250px;
                background: ${props => props.isDark ? '#383838' : '#FFF'};
                color: ${props => props.isDark ? '#FFF' : '#000'};
                text-align: right;
                border: none;
                outline: none;
                border-radius: 25px;
            }

            & > textarea {
                padding: 5px 10px;
                border: none;
                border-radius: 15px;
                background: ${props => props.isDark ? '#282828' : '#FFF'};
                color: ${props => props.isDark ? '#FFF' : '#000'};
                resize: none;
                &:focus{
                    outline: 1px solid #417493;
                }
            }

            /* & > .description {
                height: 90px;
            } */

            &:last-child {
                border: none;
            }
        }
    }
    & > .buttons {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding: 0 10px;

        & > button {
            margin-top: 10px;
            display: flex;
            align-items: center;
            padding: 4px 10px;
            border: none;
            outline: none;
            border-radius: 15px;
            margin-left: 10px;
            font-weight: bold;
            background: ${props => props.isDark ? '#213A4A' : '#417493'};
            color: #fff;
            cursor: pointer;
            
            &.cancel {
                background: #A93226;
                color: #fff;
            }
        }
    }
`;