import { useAppTheme } from "../theme/context";
import { Button, Tooltip } from "@gravity-ui/uikit";
import { Moon, Sun } from "@gravity-ui/icons";

export function ThemeToggle({ compact }: { compact: boolean }) {
    const { theme, toggleTheme } = useAppTheme();
    const isDark = theme === "dark";
    const label = isDark ? "Светлая тема" : "Тёмная тема";

    return (
        <Tooltip content={label} openDelay={300} placement="right">
            <Button
                size="l"
                width={compact ? undefined : "max"}
                onClick={toggleTheme}
                aria-label={label}
            >
                <Button.Icon>
                    {isDark ? <Sun width={16} height={16} /> : <Moon width={16} height={16} />}
                </Button.Icon>
                {!compact && label}
            </Button>
        </Tooltip>
    );
}
