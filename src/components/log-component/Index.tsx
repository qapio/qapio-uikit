import { LazyLog } from "@melloware/react-logviewer";
import {interval} from "rxjs";

const BaseStory = {
    caseInsensitive: true,
    enableGutters: false,
    enableHotKeys: true,
    enableLineNumbers: true,
    enableLinks: false,
    wrapLines: false,
    enableMultilineHighlight: true,
    enableSearch: true,
    enableSearchNavigation: true,
    extraLines: 1,
    loadingComponent: undefined,
    onError: undefined,
    onHighlight: undefined,
    onLineNumberClick: undefined,
    onLoad: undefined,
    selectableLines: true,

};

function styleLog(t: {
    timestamp: string;
    level: string;
    endpoint: string;
    type: string;
    message: string;
    exception?: string;
}): string {
    const reset = "\x1b[0m";

    // Utility to build ANSI code from foreground color and optional style
    const color = (fg: string, style?: string): string =>
        `\x1b[${style ? `${style};` : ""}${fg}m`;

    // Build each section
    const timestampColor = "90"; // grey
    const levelColor = "37";     // yellow (for 'Information')
    const levelStyle = "1";      // bold
    const componentColor = "90"; // cyan
    const messageColor = "36";   // white
    const exceptionColor = "31"; // red

    // Formatted log string
    const timestampAndLevel = `${color(timestampColor)}[${t.timestamp.substring(0, 19)} ${color(levelColor, levelStyle)}${t.level}]${reset}`;
    const endpoint = `${color(componentColor)} [${t.endpoint}]${reset}`;
    const type = `${color(componentColor)} [${t.type}]${reset}`;
    const message = `${color(messageColor)} ${t.message}${reset}`;
    const exception = t.exception ? `\n${color(exceptionColor)}${t.exception}${reset}` : "";

    return `${timestampAndLevel} ${endpoint} ${type} ${message} ${exception}`;
}

export const Index = ({endpoint}) => {

    const ref = React.createRef<LazyLog>();

    window.client.Source(`LogManager.Read({endpoint: '${endpoint}'})`).subscribe((t) => {

        const string = styleLog(t);
        console.log(string);
        ref.current?.appendLines([
          string
        ]);
    })

    return  <div className={"h-screen"}>

            <LazyLog  ref={ref} {...{
                ...BaseStory,
                external: true,
            }} />


    </div>;
}