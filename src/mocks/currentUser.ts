export type UserRole = "operator";

export interface User {
    id: string;
    name: string;
    role: UserRole;
}

export const ROLE_LABELS: Record<UserRole, string> = {
    operator: "Оператор",
};

export function getRoleLabel(role: UserRole): string {
    return ROLE_LABELS[role];
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

/* TODO: заменить на данные с сервера. Пока залогинен один пользователь. */
export const CURRENT_USER: User = {
    id: "1",
    name: "Николай Нидворай",
    role: "operator",
};
