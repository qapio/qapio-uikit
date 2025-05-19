import * as React from "react";
import {
    Button
} from "@/components";
import {cn} from "@/lib";
import { ChevronUpIcon, BarChart2Icon } from "lucide-react"
import {useLocation} from "react-router";
import {useContext, useEffect} from "react";
import {ComponentContext, ResolveComponent} from "@/utils/ResolveComponent";
import {pluckFromTree} from "@/utils/SearchTreeByPath";

interface BottomPanelProps {
    rightPanelOpen: boolean
}

export function CollapsibleBottomPanel({ rightPanelOpen, data }: BottomPanelProps) {
    const [isOpen, setIsOpen] = React.useState(true)
    const location = useLocation();
    const [content, setContent] = React.useState(null);

    const componentMap = useContext(ComponentContext);


    useEffect(() => {
        console.log('Navigation occurred at sidebar:', location.pathname);

        const value = pluckFromTree(data.navMain.items, location.pathname, "url");

        setContent(ResolveComponent(value?.panels?.terminal, componentMap));

    }, [location]);

    // Calculate panel height based on state
    const panelHeight = isOpen ? "h-64" : "h-10"

    return content && (
        <div className={cn("border-t bg-background transition-all duration-300 ease-in-out flex-shrink-0", panelHeight)}>
            {/* Panel header with toggle button */}
            <div className="flex items-center justify-between px-4 h-10 border-b bg-muted/30">
                <div className="flex items-center gap-2">
                    {/*<BarChart2Icon className="h-4 w-4" />*/}
                    <h3 className="text-sm font-medium">Terminal</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="h-6 w-6 p-0">
                    <ChevronUpIcon className={cn("h-4 w-4 transition-transform", isOpen ? "" : "rotate-180")} />
                    <span className="sr-only">{isOpen ? "Collapse" : "Expand"} panel</span>
                </Button>
            </div>

            {/* Panel content with independent scrolling */}
            <div className={cn("h-[calc(100%-2.5rem)] overflow-auto custom-scrollbar", isOpen ? "block" : "hidden")}>
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 h-full">
                    {content}
                </div>
            </div>
        </div>
    )
}

