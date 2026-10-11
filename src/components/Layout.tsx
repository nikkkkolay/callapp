import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AsideHeader, type AsideHeaderItem } from "@gravity-ui/navigation";
import { Button, Text, User } from "@gravity-ui/uikit";
import { CircleInfo, Clock, Headphones, ListUl } from "@gravity-ui/icons";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { CURRENT_USER, getInitials, getRoleLabel } from "../mocks/currentUser";
import { ThemeToggle } from "./ThemeToggle";

const MENU: { id: string; title: string; path: string; icon: typeof Clock }[] = [
    { id: "waiting", title: "Лист ожидания", path: "/waiting", icon: Clock },
    { id: "control", title: "Лист контроля", path: "/control", icon: ListUl },
    { id: "calls", title: "Звонки", path: "/", icon: Headphones },
    { id: "info", title: "Информация", path: "/info", icon: CircleInfo },
];

export function Layout() {
    const [compact, setCompact] = useLocalStorage("call-aside-compact", true);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const activeItem = MENU.find((item) => item.path === pathname) ?? MENU[0];

    const menuItems: AsideHeaderItem[] = MENU.map(({ id, title, path, icon }) => ({
        id,
        title,
        icon,
        current: pathname === path,
        onItemClick: () => navigate(path),
    }));

    return (
        <AsideHeader
            headerDecoration
            compact={compact}
            onChangeCompact={setCompact}
            logo={{
                text: "ЕКЦ МОМЦ",
                iconSrc: "/logo_momc.png",
                iconSize: 28,
                onClick: () => navigate("/waiting"),
            }}
            menuItems={menuItems}
            renderFooter={({ compact: isCompact }) => <ThemeToggle compact={isCompact} />}
            renderContent={() => (
                <main className="page">
                    <header className="topbar">
                        <Text variant="header-1">{activeItem.title}</Text>
                        <div className="topbar__user">
                            <User
                                size="s"
                                name={CURRENT_USER.name}
                                description={getRoleLabel(CURRENT_USER.role)}
                                avatar={{ text: getInitials(CURRENT_USER.name), theme: "brand" }}
                            />
                            <Button view="outlined" size="l">
                                Выход
                            </Button>
                        </div>
                    </header>
                    <div className="page__body">
                        <Outlet />
                    </div>
                </main>
            )}
        />
    );
}
