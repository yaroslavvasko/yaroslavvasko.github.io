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

      <div className="grid grid-cols-12 p-4 sm:p-6 lg:p-8">
        <section className="col-span-12 lg:col-span-10 lg:col-start-2">
          {children}
        </section>
      </div>
    </SidebarInset>
  );
}
