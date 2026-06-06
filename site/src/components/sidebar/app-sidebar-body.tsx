import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";

export function AppSidebarBody({
  children,
  ...props
}: React.ComponentProps<typeof SidebarInset> & {
  children?: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <SidebarInset {...props}>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        {isMobile && <SidebarTrigger />}
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </SidebarInset>
  );
}
