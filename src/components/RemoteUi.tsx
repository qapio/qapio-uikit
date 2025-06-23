import styled from 'styled-components';

const StyledComponent = styled('qapio-component')`
    height: 100%;
    width: 100%;

    main {
        height: 100%;
        width: 100%;
    }
    
    main > article {
        height: 100%;
        width: 100%;
    }
    
    main > article > div {
        height: 100%;
        width: 100%;
    }
`;


export const RemoteUi = ({path}) => {
    return (
        <StyledComponent path={path}></StyledComponent>
    );
}