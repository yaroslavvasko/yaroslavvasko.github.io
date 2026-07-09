import { NavLink } from "react-router";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/useSidebar";

export type NavMainProps = {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
  }[];
};

export function NavMain({ items }: NavMainProps) {
  const { isMobile, setOpenMobile } = useSidebar();

  const onNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <NavLink to={item.url} onClick={onNavClick}>
              <SidebarMenuButton
                tooltip={item.title}
                className="cursor-pointer"
                size={isMobile ? "lg" : "default"}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
