import type { DateTime } from "@gravity-ui/date-utils";
import { dateTimeParse } from "@gravity-ui/date-utils";
import type { LabelProps, TableSortState } from "@gravity-ui/uikit";

import type { WaitingRow } from "../mocks/waitingList";

export const DATE_FORMAT = "DD.MM.YYYY";
export const DATETIME_FORMAT = "DD.MM.YYYY HH:mm";

export function parseDate(value: string): DateTime | null {
    const parsed = dateTimeParse(value, { format: DATE_FORMAT });
    return parsed && parsed.isValid() ? parsed : null;
}

export function formatDate(value: DateTime | null): string {
    return value ? value.format(DATE_FORMAT) : "";
}

export function formatDateTime(value: DateTime): string {
    return value.format(DATETIME_FORMAT);
}

function dateValue(value: string): number {
    return parseDate(value)?.valueOf() ?? 0;
}

export function statusTheme(status: string): LabelProps["theme"] {
    if (status === "Подтверждён") return "success";
    if (status === "Отменён") return "danger";
    if (status === "В ожидании") return "info";
    return "normal";
}

export function priorityTheme(priority: string): LabelProps["theme"] {
    if (priority === "Высокий") return "danger";
    if (priority === "Средний") return "warning";
    if (priority === "Низкий") return "success";
    return "normal";
}

type Comparator = (a: WaitingRow, b: WaitingRow) => number;

export const SORT_COMPARATORS: Record<string, Comparator> = {
    status: (a, b) => a.status.localeCompare(b.status, "ru"),
    priority: (a, b) => a.priority.localeCompare(b.priority, "ru"),
    incidentDate: (a, b) => dateValue(a.incidentDate) - dateValue(b.incidentDate),
};

export function sortRows(rows: WaitingRow[], sortState: TableSortState): WaitingRow[] {
    if (sortState.length === 0) {
        return rows;
    }

    return [...rows].sort((a, b) => {
        for (const { column, order } of sortState) {
            const comparator = SORT_COMPARATORS[column];
            if (!comparator) {
                continue;
            }
            const result = comparator(a, b);
            if (result !== 0) {
                return order === "asc" ? result : -result;
            }
        }
        return 0;
    });
}
