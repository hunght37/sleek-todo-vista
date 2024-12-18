import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ListTodo, Star, Clock, Archive, Trash2, Settings } from "lucide-react"

const menuItems = [
  { title: "Tasks", icon: ListTodo, url: "/" },
  { title: "Important", icon: Star, url: "/important" },
  { title: "Planned", icon: Clock, url: "/planned" },
  { title: "Archive", icon: Archive, url: "/archive" },
  { title: "Trash", icon: Trash2, url: "/trash" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}