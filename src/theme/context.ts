import { createContext, useContext } from "react";

export type AppTheme = "light" | "dark";

export interface AppThemeContextValue {
    theme: AppTheme;
    setTheme: (theme: AppTheme) => void;
    toggleTheme: () => void;
}

export const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function useAppTheme() {
    const ctx = useContext(AppThemeContext);
    if (!ctx) {
        throw new Error("useAppTheme must be used within AppThemeProvider");
    }
    return ctx;
}
