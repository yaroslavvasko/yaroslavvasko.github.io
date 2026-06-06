import { Route, Routes } from "react-router";
import "./App.css";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { ThemeProvider } from "./components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import SkillsPage from "./pages/skills";
import { useIsMobile } from "./hooks/use-mobile";

function App() {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              {isMobile && <SidebarTrigger />}
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Routes>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
