import { connect } from "@qapio/qapi-reactjs";
import {
    CodeBlock,
    ResolveComponent,
    ComponentContext,
    MultiSelect,
    DatePicker,
    Button
} from "qapio-uikit";
import {of, map, isObservable} from "rxjs";
import {useContext, useState, isValidElement} from "react";
import * as React from "react";
import { Grid, Cell } from "styled-css-grid";

export const Component = ({expression, value, variables, templates, execute, properties = {}, componentMap = {}, propertyMap = {}, renderer = () => <div>fhj</div>} : InteractiveQapiProps) => {


    if (!componentMap || !value || !expression) {
        return null;
    }

    const components = useContext(ComponentContext)

    return renderer(expression, value,  Object.fromEntries(Object.entries(properties).map(([key, value]) => {


        const Component = ResolveComponent(componentMap[key]?.component, components, () => <div>NOT FOUND</div>, {propertyName: key, template: templates, variables, onChange: (value) => componentMap[key]?.action(value)});

        if (!Component) {
            return null;
        }

        return {Component, Key: key};
    }).filter((t) => t).map((t) => [t.Key, t.Component])), execute, propertyMap, variables);
}



export type Property = {
    type: string,
    component: string
    default?: any
};

export type InteractiveQapiProps = {
    template: string;
    properties: {[key: string]: Property};
}

export const Controls = connect((qapi, props) => {
    return qapi.Source(`QapiInteractive.Qapi.QapiInteractive(${JSON.stringify(props)})`);
}, (qapi, {properties}) => {

    const componentMap = {};
    const propertyMap = {};

    Object.entries(properties).forEach(([key, value]) => {
        const action =  (value) => qapi.Dispatch("setProperty")({key, value});
        componentMap[key] = {...value, action};
        propertyMap[key] = {...value, onChange: action};
    });

    return {componentMap: of(componentMap), propertyMap: of(propertyMap), value: of(qapi.Source('value')), expression: of(qapi.Source('expression').pipe(map((t) => {
            return t;
        }))), variables: of(qapi.Source('variables')), templates: of(qapi.Source('subExpressions')), execute: () => qapi.Dispatch("execute")(1)};
})(Component)


export const ControlSystem = ({config, renderer}: InteractiveQapiProps) => {
    return <Controls {...config} renderer={renderer} />
}

type CSSGridProps = {
    columns: string[];
    rows: string[];
    areas: string[];
    content: {[key: string]: string};
    title: string,
    text: string
}

export const ValueComponent = connect((_, {value}) => value.pipe(map((t) => {
    return ({value: t});
})))(({value}) => {


    if (isObservable(value)) {
        return;
    }

    // return <div>{JSON.stringify(value)}</div>

    return <CodeBlock options={{}} language={"javascript"} value={JSON.stringify(value)}/>;
});

export const TitleComponent = ({title, text}) => (

    <div className="container flex flex-col items-start gap-2 py-8 text-left md:py-16 lg:py-20 xl:gap-4">
        <h1 className="text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">{title}</h1>
        <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">{text}</p>
    </div>
)

export const CSSGridControlSystem = ({config, options}: {config: InteractiveQapiProps, options: CSSGridProps}) => <ControlSystem config={config} renderer={(expression, value, components, execute, propertyMap, variables) => {


    if (!options) {
        return;
    }

    const opt = options(expression, value, execute, propertyMap, variables);

    return <div className={"p-4"}>
        <Grid columns={opt.columns} rows={opt.rows} areas={opt.areas} gap="20px">
            {Object.entries(opt?.content)?.map(([key, component], idx) => {

                    if (components[opt?.content[key]]) {
                        return <Cell area={key} key={idx}>{components[opt?.content[key]]}</Cell>;
                    }
                    return <Cell area={key} key={idx}>{component}</Cell>;

                }
            )}
        </Grid>
    </div>
}}/>
