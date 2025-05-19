import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

import App from "./App.jsx";
import "./index.css";

function Root() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <StrictMode>
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex justify-between">
            <AppSidebar
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
            />
            
              <App />
            
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);