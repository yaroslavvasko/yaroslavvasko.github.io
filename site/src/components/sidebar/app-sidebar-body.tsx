import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { Menu } from "lucide-react";

export function AppSidebarBody({
  children,
  ...props
}: React.ComponentProps<typeof SidebarInset> & {
  children?: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <SidebarInset {...props}>
      <header className="flex sticky top-0 z-10 p-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        {isMobile && (
          <SidebarTrigger>
            <Menu size={32} />
            <img
              style={{ filter: "invert(100%)" }}
              src={"/logo.png"}
              alt="Yaroslav Vasko Logo"
              className="w-8"
            />
          </SidebarTrigger>
        )}
      </header>

      <section className="flex h-full z-1 p-4 sm:p-6 lg:p-8">
        {children}
      </section>
    </SidebarInset>
  );
}
