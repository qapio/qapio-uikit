import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {

  if (!props.data) {
    return
  }

  const data = props.data;

  return (
    <Sidebar collapsible="icon" {...props}>

        {data.teams &&  <SidebarHeader><TeamSwitcher teams={data.teams} />  </SidebarHeader>}

      <SidebarContent>
        {data?.navMain?.children && <NavMain title={data.navMain.title} children={data.navMain.children} />}
        {data?.navSecondary?.children && <NavProjects title={data.navSecondary.title} children={data.navSecondary.children} />}
      </SidebarContent>

        {data.user && <SidebarFooter><NavUser user={data.user} /> </SidebarFooter>}

      {/*<SidebarRail />*/}
    </Sidebar>
  )
}
