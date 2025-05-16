import {QapFileSystem, ResourceEditor} from "@/components";
import { createContext, useContext } from 'react';

import styled from 'styled-components';

export const ComponentContext = createContext({

});

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

export const ResolveComponent = (value: any, library) => {

    if (!value) {
        return null;
    }

    if (typeof value == "string") {
        return <StyledComponent path={value}></StyledComponent>
    }

    if (library && library[value.type]) {
        const Component = library[value.type];
        return <Component key={JSON.stringify(value.props)} {...value.props}/>
    }

    if (value.type == "ResourceEditor") {
        return <ResourceEditor key={JSON.stringify(value.props)} {...value.props}/>
    }


    if (value.type == "") {
        return <div>The s</div>
    }


    if (typeof value == "object") {
        return <div>{JSON.stringify(value)}</div>
    }

    return value;
}