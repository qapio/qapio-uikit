import * as React from "react";
import { useState, useEffect } from "react";
import {
    AppSidebar,
    ChartAreaInteractive,
    DataTable,
    SectionCards,
    SiteHeader,
    Button,
    SidebarProvider,
    SidebarInset,
    CollapsiblePanel,
    CollapsibleBottomPanel
} from "@/components";
import {MemoryRouter, Outlet, Route, Routes, useLocation} from 'react-router';
import {ResolveComponent} from "@/utils/ResolveComponent";

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


    if (!data) {
        return
    }

    return (
        <div className={"dark"}><MemoryRouter initialEntries={[currentPath]}>
            <RouterListener/>
            <Routes>
                <Route path={"/"} element={<Content data={data}/>}>
                    {data.navMain.items.map((t, idx) => {
                        return <Route key={idx} path={t.url}>
                            <Route index={true} element={ResolveComponent(t.component)}/>
                            {t.items?.map((r, idx) => {
                                return <Route key={idx} path={r.url} element={ResolveComponent(r.component)}/>
                            })}
                        </Route>
                    })}
                </Route>
            </Routes>
        </MemoryRouter></div>
    )
}

export const Content = ({data}) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)

    // Function to handle right panel state changes
    const handleRightPanelStateChange = (isOpen: boolean) => {
        setIsRightPanelOpen(isOpen)
    }
    return(
    <SidebarProvider>
        <AppSidebar data={data} variant="inset" />
        <SidebarInset className="flex flex-col !h-[calc(100vh_-_var(--spacing)*4)]">

            <SiteHeader className="flex-shrink-0" />

            {/* Main content container with flex layout */}
            <div className="flex flex-1 overflow-hidden ">
                {/* Left content area with independent scrolling and bottom panel */}
                <div className="flex-1 min-w-0 flex flex-col ">
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <div className="@container/main py-4 md:py-6 h-full">

                            <Outlet/>

                        </div>
                    </div>
                    <CollapsibleBottomPanel data={data} rightPanelOpen={isRightPanelOpen} />
                </div>
                <CollapsiblePanel data={data} onStateChange={handleRightPanelStateChange} />
            </div>
        </SidebarInset>
    </SidebarProvider>
    )
}
