import styled from 'styled-components';

export const SettingsMainContainer = styled.div`
    width: 100%;
    height: calc(100vh - 60px);

    & > .options {

        & > .option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 80px;
            border-radius: 25px;
            box-shadow: ${props => props.isDark ? '2px 2px 5px 5px rgba(0, 0, 0, .1)' : '2px 2px 5px 5px rgba(0, 0, 0, .05)'};
            background: ${props => props.isDark ? '#222' : '#fff'};
            padding: 0 30px;
            color: ${props => props.isDark ? '#fff' : '#505050'};
            transition: all .3s ease;

            & > p {
                font-weight: bold;
            }
        }
    }
`;