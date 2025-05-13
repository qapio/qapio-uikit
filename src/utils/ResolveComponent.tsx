import {ResourceEditor} from "@/components";
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

export const ResolveComponent = (value: any) => {

    if (!value) {
        return null;
    }

    if (typeof value == "string") {
        return <StyledComponent path={value}></StyledComponent>
    }


    if (value.type == "ResourceEditor") {
        return <ResourceEditor {...value.props}/>
    }

    return value;
}