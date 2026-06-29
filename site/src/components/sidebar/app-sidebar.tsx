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
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationData } from "@/nav-config";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex">
          {!isMobile && (
            <SidebarTrigger>
              <img
                style={{ filter: "invert(100%)" }}
                src={"/logo.png"}
                alt="Yaroslav Vasko Logo"
                className="w-8"
              />
            </SidebarTrigger>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavigationData.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
