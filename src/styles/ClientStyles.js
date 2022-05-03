import styled from 'styled-components';

export const ClientContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .image-container {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        
        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    } 

    & > .user-container{
        height: 220px;
        width: 100%;

        & > .user-info-container {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 100%;
            font-size: 14px;
            margin-top: 10px;
            color: ${props => props.isDark ? '#999' : '#666'};

            & > .name {
                align-self: center;
                color: #417493;
                font-size: 18px;
                font-weight: bold;
            }
            & > .content-line {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
        }
    }

    & > .buttons {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        padding: 15px 0 0;

        & > button {
            padding: 5px 15px;
            border: none;
            border-radius: 15px;
            color: #eee;
            cursor: pointer;
        }

        & > .edit {
            background: ${props => props.isDark ? '#213A4A' : '#417493'}; 
        }

        & > .delete {
            background: #A93226;
        }
    }
`;