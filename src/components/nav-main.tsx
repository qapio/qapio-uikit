import * as React from "react"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {NavLink, Link} from "react-router-dom";
import {connect} from "@qapio/qapi-reactjs";
import {WorkspaceEditor} from "@/components/editor/WorkspaceEditor";


const SubMenu = () => connect((qapi, {item}) => {

  console.log("ØDjjjHBDÆ!", item)

  if (typeof item.items == "string") {
    console.log("DDB")
    return {item: {...item, items: [ {
        title: "Ui",
        url: "customers2",
        component: <WorkspaceEditor/>,
      },
        {
          title: "Qapi",
          url: "customers22",
          component: <div>asdf</div>
        }]}}
  }

  console.log(item)
  return {item};

})(({item}) => {


  if (!item) {
    return;
  }

  return   <SidebarMenuItem>
    <CollapsibleTrigger asChild>
      <SidebarMenuButton tooltip={item.title}>
        {item.icon && <item.icon />}
        <Link className={"w-full"} to={item.url}>{item.title}</Link>
        {item.items && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
      </SidebarMenuButton>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>
        {Array.isArray(item.items) && item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <NavLink to={item.url+"/"+subItem.url}>{subItem.title}</NavLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        ))}
      </SidebarMenuSub>
    </CollapsibleContent>
  </SidebarMenuItem>

})
export function NavMain({
    title,
  items,
}: {
  title: string,
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {




  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {

          const Sub = SubMenu();

          return (
              <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
              >
                <Sub item={item}/>
              </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
