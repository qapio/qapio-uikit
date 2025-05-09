import {useIsMobile} from "@/hooks";
import {Button} from "@/components/ui/button";
import {PanelRightIcon} from "lucide-react";
import {cn} from "@/lib";

interface CollapsiblePanelProps {
    onStateChange?: (isOpen: boolean) => void
}
export function CollapsiblePanel({ onStateChange }: CollapsiblePanelProps) {
    const [isOpen, setIsOpen] = React.useState(true)
    const isMobile = useIsMobile()
    const panelRef = React.useRef<HTMLDivElement>(null)

    // Notify parent component when state changes
    React.useEffect(() => {
        if (onStateChange) {
            onStateChange(isOpen)
        }
    }, [isOpen, onStateChange])

    // Hide panel completely on mobile
    if (isMobile) {
        return null
    }

    const togglePanel = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative hidden md:block h-full">
            {/* Toggle button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={togglePanel}
                className="absolute -left-7 top-4 z-10 h-7 w-7 rounded-full border bg-background shadow-sm"
            >
                <PanelRightIcon className={cn("h-4 w-4 transition-transform", isOpen ? "" : "rotate-180")} />
                <span className="sr-only">Toggle panel</span>
            </Button>

            {/* Collapsible panel with independent scrolling */}
            <div
                ref={panelRef}
                className={cn(
                    "h-full border-l bg-background transition-all duration-300 ease-in-out",
                    isOpen ? "w-80" : "w-0 opacity-0 overflow-hidden",
                )}
            >
                {/* This div is the scrollable container */}
                <div className="h-full overflow-y-auto custom-scrollbar" style={{ width: isOpen ? "20rem" : "0" }}>
                    <div className="p-4">
                        {/* Panel content */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold">Panel Content</h3>
                            <p className="text-muted-foreground">This panel scrolls independently from the main content.</p>

                            {/* Sample content to demonstrate scrolling */}
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} className="rounded-lg border p-4 mb-4">
                                    <h4 className="font-medium">Item {i + 1}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        This is a sample item to demonstrate independent scrolling.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

