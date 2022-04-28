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
            font-size: 14px;
            color: ${props => props.isDark ? '#999' : '#666'};

            & > .name {
                color: #417493;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }

    & > .buttons {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        padding: 15px 0;

        & > button {
            padding: 5px 0;
            width: 90px;
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