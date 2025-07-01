import {QapFileSystem, ResourceEditor} from "@/components";
import { createContext, useContext } from 'react';
import * as React from "react";
import styled from 'styled-components';
import {Story} from "@/components/story/Story";
import {Steps} from "@/components/story/Steps";
import {Link} from "react-router-dom";

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

export const ResolveComponent = (value: any, library, Fallback?, props = {}) => {


    if (typeof value == "function") {
        const Component = value;
        return <Component {...props}/>
        return value(props);
    }

    if (!value) {
        return null;
    }

    if (React.isValidElement(value)) {
        return value;
    }

    if (typeof value == "string") {
        return <StyledComponent path={value}></StyledComponent>
    }

    if (library && library[value.type]) {
        const Component = library[value.type];
        return <Component key={JSON.stringify(value.props)} {...value.props} {...props}/>
    }

    if (value.type == "ResourceEditor") {
        return <ResourceEditor key={JSON.stringify(value.props)} {...value.props}/>
    }

    if (value.type == "Story") {
        return <Story {...value.props}/>
    }

    if (value.type == "Steps") {
        return <Steps {...value.props}/>
    }

    if (value.type == "") {
        return <Link className={"w-full"} to={"/DataApi/Ui"}>BIFF</Link>
    }

    if (typeof value == "object" && Fallback) {
        return <Fallback {...value}/>
    }

    return value;
}