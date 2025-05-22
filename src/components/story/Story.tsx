import {useContext} from "react";
import {ComponentContext, ResolveComponent} from "@/utils/ResolveComponent";

export const Story = ({items}) => {

    const componentMap = useContext(ComponentContext);

    return <div className={"p-2"}>{items?.map((t, idx) => <div key={idx}>{ResolveComponent(t, componentMap)}</div>)}</div>;
};
