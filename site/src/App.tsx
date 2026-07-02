import { Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import ReactGA from "react-ga4";
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
import NotFound from "./pages/notfound";

function App() {
  const location = useLocation();

  // Track page views with Google Analytics
  useEffect(() => {
    const GA_ID = import.meta.env.VITE_GA_ID;
    if (GA_ID && GA_ID !== "G-XXXXXXXXXX") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
        title: document.title,
      });
    }
  }, [location]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <SidebarProvider>
          {/* Skip Navigation Link for accessibility */}
          <a href="#main-content" className="sr-only">
            Skip to main content
          </a>

          <nav aria-label="Main navigation">
            <AppSidebar />
          </nav>

          <AppSidebarBody>
            <main id="main-content">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </AppSidebarBody>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
