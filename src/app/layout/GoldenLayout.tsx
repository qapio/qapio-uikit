import * as React from "react";
import {useState, useEffect, useContext} from "react";
import {
    AppSidebar,
    SiteHeader,
    SidebarProvider,
    SidebarInset
} from "@/components";
import {MemoryRouter, Outlet, Route, Routes, useLocation} from 'react-router';
import {ComponentContext, ResolveComponent} from "@/utils/ResolveComponent";
import {Allotment} from "allotment";
import {pluckFromTree} from "@/utils/SearchTreeByPath";


const RouterListener = () => {
    const location = useLocation();

    useEffect(() => {
        const logLocationChange = () => {
            console.log('Navigation occurred:', location.pathname);
            sessionStorage.setItem('currentPath22', location.pathname); // Store path in sessionStorage
        };

        logLocationChange(); // Log the initial location
    }, [location]);

    return null;
};

export const Layout = ({data}) => {

    const [currentPath, setCurrentPath] = useState(sessionStorage.getItem('currentPath22') ?? "/");

    useEffect(() => {
        const storedPath = sessionStorage.getItem('currentPath22');
        if (storedPath) {
            setCurrentPath(storedPath);
        }
    }, []);

    const componentMap = useContext(ComponentContext);

    if (!data) {
        return
    }

    return (
       <div className={"dark"}><MemoryRouter initialEntries={[currentPath]}>
            <RouterListener/>
            <Routes>
                <Route path={"/"} element={<Content data={data}/>}>
                    {data.navMain.items.map((t, idx) => {

                        const clone = {...t};

                        return <Route key={idx} path={clone.url}>
                            <Route index={true} element={ResolveComponent(clone.component, componentMap)}/>
                            {clone.items?.map((r, idx) => {
                                return <Route key={idx} path={r.url} element={ResolveComponent(r.component, componentMap)}/>
                            })}
                        </Route>
                    })}
                </Route>
            </Routes>
        </MemoryRouter></div>
    )
}

type Aux = {
    utilities?: React.ReactElement,
    terminal?: React.ReactElement,
}

const RenderUtils = ({setRightVisible, aux}) => {
    return <div className="w-full h-full overflow-auto custom-scrollbar">
        {aux.utilities}
    </div>;
}
const RenderTerminal = (setBottomVisible: (value: (((prevState: boolean) => boolean) | boolean)) => void, bottomVisible: boolean, aux: Aux) => {
    return <div className="w-full h-full bg-black text-white p-4 overflow-auto custom-scrollbar">
        {aux.terminal}
    </div>;
}

export const RightContent = ({
         rightVisible,
         bottomVisible,
         setRightVisible,
         setBottomVisible,
     }) => (
        <ul className="flex fill-zinc-300">
            <li className="flex items-center justify-center relative">
                <button
                    className="hover:bg-zinc-800 rounded-[5px] p-[3px] cursor-pointer"
                    aria-label="Toggle Bottom Panel"
                    onClick={() => setBottomVisible((v) => !v)}
                >
                    {bottomVisible ? (
                        // codicon-layout-panel
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 10V2H14V10H2Z"/></svg>
                    ) : (
                        // codicon-layout-panel-off
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="inherit"><path d="M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 10.0007V2.00073H14V10.0007H2ZM2 11.0007H14V14.0007H2V11.0007Z"/></svg>
                    )}
                </button>
            </li>

            <li className="flex items-center justify-center relative">
                <button
                    className="hover:bg-zinc-800 rounded-[5px] p-[3px] cursor-pointer"
                    aria-label="Toggle Right Panel"
                    onClick={() => setRightVisible((v) => !v)}
                >
                    {rightVisible ? (
                        // codicon-layout-sidebar-right
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="inherit"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 14V2H9V14H2Z"/></svg>
                    ) : (
                        // codicon-layout-sidebar-right-off
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="inherit"><path d="M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 14.0007V2.00073H9V14.0007H2ZM10 14.0007V2.00073H14V14.0007H10Z"/></svg>
                    )}
                </button>
            </li>
        </ul>
);

export const Content = ({data}) => {

    const [rightVisible, setRightVisible] = useState(true);
    const [bottomVisible, setBottomVisible] = useState(true);

    const location = useLocation();
    const [aux, setAux] = React.useState<Aux>({});

    const componentMap = useContext(ComponentContext);


    useEffect(() => {
        // console.log('Navigation occurred at sidebar:', location.pathname);

        const value = pluckFromTree(data.navMain.items, location.pathname, "url");

        setAux({
            utilities: ResolveComponent(value?.panels?.utilities, componentMap),
            terminal: ResolveComponent(value?.panels?.terminal, componentMap)
        });

    }, [location]);

    if (!data) {
        return;
    }

    return(
    <SidebarProvider>
        <AppSidebar data={data} variant="inset"/>
        <SidebarInset className="flex flex-col !h-[calc(100vh_-_var(--spacing)*4)] overflow-hidden">

            <SiteHeader className="flex-shrink-0" rightContent={
                <RightContent
                    rightVisible={rightVisible}
                    bottomVisible={bottomVisible}
                    setRightVisible={setRightVisible}
                    setBottomVisible={setBottomVisible}/>}
            />

            <Allotment
                defaultSizes={[75, 25]}
                snap
                onVisibleChange={(_, v) => setRightVisible(v)}
                className="splitViewContainer"
            >
                {/* Left Side: Main + Bottom Stack */}
                <Allotment.Pane className="leftPane">
                    <Allotment
                        vertical
                        defaultSizes={[75, 25]}
                        snap
                        className={"splitViewContainer"}
                        onVisibleChange={(_, v) => setBottomVisible(v)}
                    >
                        {/* Main Editor Area */}
                        <Allotment.Pane>
                            <div className="flex-1 h-full overflow-auto custom-scrollbar">
                                <div className="@container/main h-full">
                                    <Outlet/>
                                </div>
                            </div>
                        </Allotment.Pane>

                        {/* Bottom Panel */}
                        <Allotment.Pane visible={!!aux.terminal && bottomVisible} minSize={100} className={"bottomPane"}>
                            {RenderTerminal(setBottomVisible, bottomVisible, aux)}
                        </Allotment.Pane>
                    </Allotment>
                </Allotment.Pane>

                {/* Right Panel with animated width */}
                <Allotment.Pane minSize={300} className="rightPane" visible={!!aux.utilities && rightVisible}>
                    <RenderUtils setRightVisible={setRightVisible} aux={aux}/>
                </Allotment.Pane>
            </Allotment>
        </SidebarInset>
    </SidebarProvider>
    )
}
