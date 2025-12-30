import { Calendar, Home, Inbox, Search, Settings, ChevronDown } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "../dashboard",
    icon: Home,
    haschild: false,
  },
  {
    title: "Tables",
    url: "#",
    icon: Inbox,
    haschild: true,
    children: [
      {
        title: "Profiles",
        url: "../tables/profiles",
        icon: Inbox,
        visible: true,
      },
      {
        title: "Verification History",
        url: "../tables/verification",
        icon: Inbox,
        visible: true,
      },
      {
        title: "Social Media",
        url: "../tables/socialmedia",
        icon: Inbox,
        visible: true,
      },
    ],
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

// App sidebar component.

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Instagram & TikTok Scraping</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                {item.title === "Tables" && item.children && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                    {item.children.filter((sub) => sub.visible !== false).map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={sub.url}>
                            <sub.icon />
                            <span>{sub.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
                </SidebarMenuItem>
              ))}  
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}