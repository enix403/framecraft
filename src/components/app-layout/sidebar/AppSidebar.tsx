import urlJoin from "url-join";
import { Frame } from "lucide-react";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { unslashEnd } from "@/lib/utils";

const items = [
  {
    path: "/",
    label: "My Designs",
    Icon: Frame
  }
];

type SidebarItem = (typeof items)[number];

function AppSidebarItem({ item }: { item: SidebarItem }) {
  const path = unslashEnd(urlJoin("/app", item.path));

  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip='My Designs' asChild>
        <Link to={path}>
          <item.Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        {/*  */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {items.map(item => (
              <AppSidebarItem key={item.path} item={item} />
            ))}
            {/*  <SidebarMenuItem>
              <SidebarMenuButton tooltip='My Designs' asChild>
                <a href='#'>
                  <Frame />
                  <span>My Designs</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
        {/*  */}
      </SidebarContent>
    </Sidebar>
  );
}
