import { ResolveComponent } from "@/utils/ResolveComponent";

export const Step = ({ title, text, content }) => {
    return (
        <div className="mt-8 w-full break-words">
            <h2 className="font-heading mt-16 scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 break-words whitespace-normal w-full">
                {title}
            </h2>
            <div className="leading-[1.65rem] mt-6 break-words whitespace-normal w-full">
                {text}
            </div>
            <div className="leading-[1.65rem] mt-6 break-words whitespace-normal w-full">
                {ResolveComponent(content, {})}
            </div>
        </div>
    );
};

export const Steps = ({ title, subtitle, text, items }) => {
    return (
        <div className="space-y-2 w-full max-w-full break-words">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight break-words whitespace-normal w-full">
                {title}
            </h1>
            <div className="text-base text-muted-foreground mb-0 break-words whitespace-normal w-full">
                {subtitle}
            </div>
            <div className="pb-12 pt-8 w-full">
                {text && (
                    <div className="leading-[1.65rem] break-words whitespace-normal w-full">
                        {text}
                    </div>
                )}
                {items?.map((item, idx) => {
                    return <div key={idx}>{ResolveComponent(item, {}, Step)}</div>;
                })}
            </div>
        </div>
    );
};
