import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { SnackbarProvider } from "notistack";
import { AdminProvider } from "./context/AdminContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={4000}
        >
          <AdminProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </AdminProvider>
        </SnackbarProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);