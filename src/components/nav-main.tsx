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
import {c} from "../../../../../../../.cache/deno/npm/registry.npmjs.org/framer-motion/12.4.1/dist/types.d-6pKw1mTI";


const SubMenu = connect((qapi, {item}) => {

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
        {item.children && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
      </SidebarMenuButton>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <SidebarMenuSub>
        {Array.isArray(item.children) && item.children?.map((subItem) => (
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
  children,
}: {
  title: string,
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    children?: {
      title: string
      url: string
    }[]
  }[]
}) {


  console.log(children, "BIFF")

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {children.map((item, idx) => {

          return (
              <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
              >
                <SubMenu key={idx} item={item}/>
              </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
