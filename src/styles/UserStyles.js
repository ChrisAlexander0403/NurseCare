import styled from 'styled-components';

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;

    & > .user-image {
        position: relative;
        transform-style: preserve-3d;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: #fff;

        &::before {
            position: absolute;
            transform: translateZ(-1px);
            top: -6px;
            left: -6px;
            content: '';
            width: 192px;
            height: 192px;
            border-radius: 50%;
            background: ${props => props.isDark ? '#383838' : '#DDD'};
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

    & > .content {
        width: 100%;
        margin-top: 20px;
        color: ${props => props.isDark ? '#999' : '#666'};

        & > .content-line {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 10px;
            border-bottom: ${props => props.isDark ? '1px solid #666' : '1px solid #999'};
        }
    }
`;