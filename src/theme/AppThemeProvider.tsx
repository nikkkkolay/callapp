import { useCallback, useMemo, type ReactNode } from "react";
import { ThemeProvider } from "@gravity-ui/uikit";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { AppThemeContext, type AppTheme } from "./context";

const STORAGE_KEY = "call-theme";

const DEFAULT_THEME: AppTheme = "light";

export function AppThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useLocalStorage<AppTheme>(STORAGE_KEY, DEFAULT_THEME);

    const toggleTheme = useCallback(
        () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
        [setTheme],
    );

    const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

    return (
        <AppThemeContext.Provider value={value}>
            <ThemeProvider theme={theme} lang="ru">
                {children}
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
}
