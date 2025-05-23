import {ResolveComponent} from "@/utils/ResolveComponent";

export const Step = ({title, text, content}) => {
    return (<div className={"mt-8"}>
            <h2 className="font-heading mt-16 scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">{title}</h2>
            <p className="leading-[1.65rem] mt-6">{text}</p>
            <div className={"leading-[1.65rem] mt-6"}>{ResolveComponent(content, {})}</div>
        </div>
    );
}
export const Steps = ({title, subtitle, text, items}) => {
    return (
        <div className="space-y-2">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
                {title}
            </h1>
            <div className="text-base text-muted-foreground mb-0">{subtitle}</div>
            <div className={"pb-12 pt-8"}>
                {text && <p className="leading-[1.65rem]">{text}</p>}
                {items?.map((item, idx) => {
                    return ResolveComponent(item, {}, Step)
                })}
            </div>
        </div>
    )
}