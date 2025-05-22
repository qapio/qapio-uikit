import {ResolveComponent} from "@/utils/ResolveComponent";

const Step = ({title, text, content}) => {
    console.log("ØDÆD")
    return (<div className={"mt-16"}>
            <h2 className="font-heading mt-16 scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">{title}</h2>
            <p className="leading-[1.65rem] mt-6">{text}</p>
            <div>{ResolveComponent(content, {})}</div>
        </div>
    );
}
export const Steps = ({title, text, items}) => {
    return (
        <div className="space-y-2">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
                {title}
            </h1>
            <div className={""}>
                <div className="text-base text-muted-foreground">
                    <p className="leading-[1.65rem] mt-6">{text}</p>
                </div>

                {items?.map((item, idx) => {
                    return ResolveComponent(item, {}, Step)
                })}
            </div>
        </div>
    )
}