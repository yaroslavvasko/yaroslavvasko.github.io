"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { House, SquareUser, Toolbox, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: <House />,
      isActive: true,
    },
    {
      title: "About",
      url: "/about",
      icon: <SquareUser />,
    },
    {
      title: "Skills",
      url: "/skills",
      icon: <Toolbox />,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: <Phone />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex">{!isMobile && <SidebarTrigger />}</div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
