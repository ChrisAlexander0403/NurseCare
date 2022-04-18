import styled from 'styled-components';

export const CloseSession = styled.div`
    width: 100%;
    height: 100px;

    & > .info {
        height: 70%;
        padding: 10px;
        color: #fff;
        font-size: 14px;
    }

    & > .buttons {
        height: 30%;
        display: flex;
        justify-content: space-evenly;

        & > button {
            padding: 5px 15px;
            border: none;
            border-radius: 20px;
            background: #417493;
            color: #fff;
            font-weight: bold;
            cursor: pointer;

            &.cancel {
                background: #A93226;
            }
        }
    }
`;