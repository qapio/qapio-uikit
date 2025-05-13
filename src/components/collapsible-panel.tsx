import {useIsMobile} from "@/hooks";
import {Button} from "@/components/ui/button";
import {PanelRightIcon} from "lucide-react";
import {cn} from "@/lib";
import {useLocation} from "react-router";
import {useEffect} from "react";
import * as React from "react";
import {ResolveComponent} from "@/utils/ResolveComponent";
import {pluckFromTree} from "@/utils/SearchTreeByPath";

interface CollapsiblePanelProps {
    onStateChange?: (isOpen: boolean) => void
}


export function CollapsiblePanel({data}) {
    const [isOpen, setIsOpen] = React.useState(true)
    const isMobile = useIsMobile()
    const panelRef = React.useRef<HTMLDivElement>(null)
    const location = useLocation();
    const [content, setContent] = React.useState(null);


    // Hide panel completely on mobile
    if (isMobile) {
        return null
    }



    useEffect(() => {
        console.log('Navigation occurred at sidebar:', location.pathname);

        const value = pluckFromTree(data.navMain.items, location.pathname, "url");

        setContent(ResolveComponent(value?.panels?.utilities));

    }, [location]);


    return content && (
        <div className={"relative"}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -left-7 top-4 z-10 h-7 w-7 rounded-full border bg-background shadow-sm"
            >
                <PanelRightIcon className={cn("h-4 w-4 transition-transform", isOpen ? "" : "rotate-180")} />
                <span className="sr-only">Toggle panel</span>
            </Button>
            <div className="relative h-full overflow-x-hidden overflow-y-auto custom-scrollbar">
                {/* Toggle button */}


                {/* Collapsible panel with independent scrolling */}
                <div
                    ref={panelRef}
                    className={cn(
                        "h-full border-l bg-background transition-all duration-300 ease-in-out",
                        isOpen ? "w-80" : "w-0 opacity-0 overflow-hidden",
                    )}
                >
                    {/* This div is the scrollable container */}
                    <div className="h-fit overflow-y-auto" style={{ width: isOpen ? "20rem" : "h-fit" }}>
                        <div className="p-4">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}