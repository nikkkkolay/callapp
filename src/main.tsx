import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster, ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";
import { settings } from "@gravity-ui/date-utils";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "./styles/theme.css";
import "./index.css";

import App from "./App";
import { AppThemeProvider } from "./theme/AppThemeProvider";

const toaster = new Toaster();

settings
    .loadLocale("ru")
    .catch(() => undefined)
    .finally(() => {
        createRoot(document.getElementById("root")!).render(
            <StrictMode>
                <ToasterProvider toaster={toaster}>
                    <AppThemeProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                        <ToasterComponent />
                    </AppThemeProvider>
                </ToasterProvider>
            </StrictMode>,
        );
    });
