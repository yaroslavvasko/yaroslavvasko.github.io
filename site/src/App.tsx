import { Route, Routes } from "react-router";
import "./App.css";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { AppSidebarBody } from "./components/sidebar/app-sidebar-body";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import HomePage from "./pages/home";
import SkillsPage from "./pages/skills";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <AppSidebarBody>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
          </AppSidebarBody>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
