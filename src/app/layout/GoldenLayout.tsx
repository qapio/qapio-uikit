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

const RouterListener = () => {
    const location = useLocation();

    useEffect(() => {
        const logLocationChange = () => {
            console.log('Navigation occurred:', location.pathname);
            sessionStorage.setItem('currentPath2', location.pathname); // Store path in sessionStorage
        };

        logLocationChange(); // Log the initial location
    }, [location]);

    return null;
};

export const Layout = ({items}) => {
    const [currentPath, setCurrentPath] = useState(sessionStorage.getItem('currentPath2') ?? "/");
    useEffect(() => {
        const storedPath = sessionStorage.getItem('currentPath2');
        if (storedPath) {
            setCurrentPath(storedPath);
        }
    }, []);


    if (!items) {
        return
    }
    console.log(items, "innin leayot")
    return (
        <div className={"dark"}><MemoryRouter initialEntries={[currentPath]}>
            <RouterListener/>
            <Routes>
                <Route path={"/"} element={<Content items={items}/>}>
                    {items.navMain.items.map((t, idx) => {
                        return <Route key={idx} path={t.url}>
                            <Route index={true} element={t.component}/>
                            {t.items?.map((r, idx) => {
                                return <Route key={idx} path={r.url} element={r.component}/>
                            })}
                        </Route>
                    })}
                </Route>
            </Routes>
        </MemoryRouter></div>
    )
}

export const Content = ({items}) => {
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)

    console.log("bi er her")
    // Function to handle right panel state changes
    const handleRightPanelStateChange = (isOpen: boolean) => {
        setIsRightPanelOpen(isOpen)
    }
    return(
    <SidebarProvider>
        <AppSidebar data={items} variant="inset" />
        <SidebarInset className="flex flex-col !h-[calc(100vh_-_var(--spacing)*4)]">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Outlet/>
            </div>
            <SiteHeader className="flex-shrink-0" />
            {/* Main content container with flex layout */}
            <div className="flex flex-1 overflow-hidden ">
                {/* Left content area with independent scrolling and bottom panel */}
                <div className="flex-1 min-w-0 flex flex-col ">
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <div className="@container/main">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <SectionCards />
                                <div className="px-4 lg:px-6">
                                    <ChartAreaInteractive />
                                </div>
                                {/*<DataTable data={data.slice(0, 10)} />*/}
                            </div>
                        </div>
                    </div>
                    <CollapsibleBottomPanel rightPanelOpen={isRightPanelOpen} />
                </div>
                <CollapsiblePanel onStateChange={handleRightPanelStateChange} />
            </div>
        </SidebarInset>
    </SidebarProvider>
    )
}
