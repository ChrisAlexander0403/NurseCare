import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background: ${props => props.isDark ? '#181818' : '#EEE'};
`;