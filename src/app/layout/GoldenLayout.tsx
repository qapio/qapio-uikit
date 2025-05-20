import * as React from "react";
import {useState, useEffect, useContext} from "react";
import {
    AppSidebar,
    SiteHeader,
    SidebarProvider,
    SidebarInset,
    CollapsiblePanel,
    CollapsibleBottomPanel
} from "@/components";
import {MemoryRouter, Outlet, Route, Routes, useLocation} from 'react-router';
import {ComponentContext, ResolveComponent} from "@/utils/ResolveComponent";
import {connect} from "@qapio/qapi-reactjs";
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


    return(
    <SidebarProvider>
        <AppSidebar data={data} variant="inset" />
        <SidebarInset className="flex flex-col !h-[calc(100vh_-_var(--spacing)*4)] overflow-hidden">

            <SiteHeader className="flex-shrink-0" />

            <Allotment defaultSizes={[75, 25]} snap onVisibleChange={(_, v) => setRightVisible(v)}>
                {/* Left Side: Main + Bottom (Vertical stack) */}
                <Allotment.Pane>
                    <Allotment vertical defaultSizes={[75, 25]} snap onVisibleChange={(_, v) => setBottomVisible(v)}>
                        {/* Main Editor Area */}
                        <Allotment.Pane>
                            <div className="flex-1 h-full overflow-auto custom-scrollbar">
                                <div className="@container/main h-full">
                                    <Outlet/>
                                </div>
                            </div>
                        </Allotment.Pane>

                        {/* Bottom Panel (e.g. terminal) */}
                        <Allotment.Pane visible={bottomVisible}>
                            <div className="w-full h-full bg-black text-white p-4">
                                {aux.terminal}
                            </div>
                        </Allotment.Pane>
                    </Allotment>
                </Allotment.Pane>

                {/* Right Pane */}
                <Allotment.Pane visible={rightVisible}>
                    <div className="w-full h-full p-4">
                        {aux.utilities}
                    </div>
                </Allotment.Pane>
            </Allotment>
        </SidebarInset>
    </SidebarProvider>
    )
}
