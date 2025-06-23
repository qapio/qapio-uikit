import * as React from "react";
import { useState } from "react";
import { Check, Clipboard } from "lucide-react";

const CopyButton = ({ value }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(value);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    };

    return (
        <button
            onClick={handleClick}
            className="inline-flex h-full w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0  text-zinc-50 hover:bg-slate-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
        >
            <span className="sr-only">Copy</span>
            {isCopied
                ? <Check className="w-3 h-3" />
                : <Clipboard className="w-3 h-3" />}
        </button>
    );
};

const LockIcon = () => (
    <svg
        className="min-w-2 max-w-2 fill-gray-400"
        fill="inherit"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
    >
        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
    </svg>
);

const getTabClasses = (items, activeTab, index) => {
    const isActive = items[index].id === activeTab;
    const isLast = index === items.length - 1;
    const prevTabActive = index > 0 && items[index - 1]?.id === activeTab;
    const nextTabActive = index < items.length - 1 &&
        items[index + 1]?.id === activeTab;

    let classes =
        `px-4 py-1.5 -mb-px flex items-center justify-center space-x-2 transition-all duration-200`;

    if (isActive) {
        classes += " text-slate-900 font-medium dark:text-slate-200 bg-slate-700";
    } else {
        classes +=
            " bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500";
    }

    if (nextTabActive) classes += " rounded-tr";
    if (prevTabActive) classes += " rounded-tl";

    return classes;
};

const TabRenderer = ({ items }) => {
    return (
        <div
            className={`grid text-xs leading-5 overflow-hidden grid-cols-${items.length}`}
        >
            {items.map((item, index) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={getTabClasses(items, activeTab, index)}
                >
                    {item.icon && <div className="">{item.icon}</div>}
                    <div className={""}>{item.label}</div>
                </button>
            ))}
        </div>
    );
};

export const BrowserWindow = React.memo((
    {
        children,
        url = "qapio.com",
        copyButtonValue = false,
        items = [],
        hideAddressBar,
    },
) => {

    const defaultActiveTab = items.find((item) => item.isActive) || items[0];
    const [activeTab, setActiveTab] = useState(defaultActiveTab?.id || "");

    return (
        <div
            id="browser-window"
            className="flex h-full dark rounded-xl min-w-full max-w-full"
        >
            <div className="flex flex-col h-full w-full rounded-xl border overflow-hidden">
                <div className=" dark:bg-muted ">
                    {!hideAddressBar && <div className="py-2.5 grid items-center px-4 gap-6 grid-cols-[2.625rem_1fr_2.625rem] h-12">
                        <div className="flex items-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                            <div className="ml-1.5 w-2.5 h-2.5 rounded-full bg-amber-400">
                            </div>
                            <div className="ml-1.5 w-2.5 h-2.5 rounded-full bg-green-600">
                            </div>
                        </div>
                        <div
                            className="px-3 w-full gap-2 relative rounded-md font-medium text-xs leading-6 py-1 flex items-center justify-center ring-1 ring-inset ring-slate-900/5 mx-auto dark:bg-background dark:text-gray-400">
                            {/*<LockIcon />*/}
                            {url}
                            {copyButtonValue && (
                                <div
                                    className="bg-slate-800 rounded-md absolute right-2 h-6 w-6 inline-flex items-center justify-center">
                                    <CopyButton value={copyButtonValue}/>
                                </div>
                            )}
                        </div>
                    </div>}

                    {items.length > 0 && (
                        <div
                            className={`grid text-xs leading-5 overflow- grid-cols-${items.length}`}
                        >
                            {items.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={getTabClasses(items, activeTab, index)}
                                >
                                    {item.icon && <div className="">{item.icon}</div>}
                                    <div className={""}>{item.label}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`${
                    hideAddressBar ? 'rounded-t-xl' : ''
                } border-t border-muted/50 relative rounded-b-xl pb-0 dark:bg-muted flex h-full w-full`}
                >
                    {items.find((item) => item.id === activeTab)?.content || children}
                    <div
                        className={"h-4"}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
});