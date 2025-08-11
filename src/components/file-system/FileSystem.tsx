import * as React from "react";
import {ResourceEditor} from "@/components";
import {useState} from "react"
import {connect} from "@qapio/qapi-reactjs";
import { File, Clipboard } from "lucide-react"
import {map} from "rxjs";


const QapFileSystemComponent = ({endpoint, items=[], setSelectedFile, selected}) => {

    console.log(endpoint, items, "DHGD")
    if (!items) {
        return;
    }

    // select first item in the list
    React.useEffect(() => {
        if (items.length > 0 && !selected) {
            setSelectedFile({ path: items[0].path });
        }
    }, [items, selected, setSelectedFile]);

    console.log(522222222, items, endpoint, selected)
    return (
        <div
            className=" flex h-full overflow-hidden bg-background text-white group-data-[view=preview]/block-view-wrapper:hidden"
        >
            <div className="w-[280px]">
                <div
                    className="group/sidebar-wrapper min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar flex !min-h-full flex-col"
                    style={{
                        "--sidebar-width": "16rem",
                        "--sidebar-width-icon": "3rem",
                    }}
                >
                    <div className="flex h-full flex-col w-full flex-1 border-r border-zinc-700 bg-background text-white">
                        <div
                            data-sidebar="group-label"
                            className="flex shrink-0 items-center font-medium outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 h-12 rounded-none border-b border-zinc-700 px-4 text-sm text-white"
                        >
                            Files
                        </div>
                        <div data-sidebar="group" className="relative flex w-full min-w-0 flex-col p-2">
                            <div data-sidebar="group-content" className="w-full text-sm">
                                <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
                                    {items.map((file, idx) => {
                                        return <li key={idx} data-sidebar="menu-item" className="group/menu-item relative">
                                            <button data-sidebar="menu-button" data-size="default" data-active={selected === file.path}
                                                    onClick={() => setSelectedFile({path: file.path})}
                                                    className="peer/menu-button flex items-start w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&amp;>span:last-child]:truncate [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm">
                                                <File className="size-4 shrink-0" />
                                                {file.path}
                                            </button>
                                            <div data-sidebar="menu-badge"
                                                 className="pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 group-data-[collapsible=icon]:hidden">
                                            </div>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <div
                    className="flex h-12 shrink-0 items-center gap-2 border-b border-zinc-700 bg-background px-4 text-sm font-medium">
                    <File className="size-4 shrink-0" />
                    {selected}
                    {/*<div className="ml-auto flex items-center gap-2">
                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3">
                            <Clipboard className="size-4 shrink-0" />
                        </button>
                    </div>*/}
                </div>
                <div className={"flex grow-1"}>
                   {selected && <ResourceEditor key={selected} endpoint={endpoint} path={selected}/>}
                </div>
            </div>
        </div>

    );
}

export const QapFileSystem = () => connect((qapi, {endpoint}) => qapi.Source(`QapFileSystem.Qapi.FileSystem({endpoint: '${endpoint}'})`).pipe(map((t) => {
    console.log("QAPFILE")
    return t;
})), (disp) => ({
    setSelectedFile: disp.Dispatch('setSelected')
}))(QapFileSystemComponent)