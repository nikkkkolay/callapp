import { useMemo } from "react";
import {
    Label,
    Table,
    withTableSorting,
    type TableColumnConfig,
    type TableSortState,
} from "@gravity-ui/uikit";

import type { WaitingRow } from "../../mocks/waitingList";
import { priorityTheme, SORT_COMPARATORS, statusTheme } from "../../utils/waitingList";

const SortableTable = withTableSorting<WaitingRow>(Table);

const BASE_COLUMNS: TableColumnConfig<WaitingRow>[] = [
    {
        id: "status",
        name: "Статус",
        meta: { sort: SORT_COMPARATORS.status },
        template: (row) => <Label theme={statusTheme(row.status)}>{row.status}</Label>,
    },
    {
        id: "priority",
        name: "Приоритет",
        meta: { sort: SORT_COMPARATORS.priority },
        template: (row) => <Label theme={priorityTheme(row.priority)}>{row.priority}</Label>,
    },
    { id: "incidentDate", name: "Дата инцидента", meta: { sort: SORT_COMPARATORS.incidentDate } },
    { id: "patient", name: "Пациент" },
    { id: "category", name: "Категория" },
    { id: "reason", name: "Причина обращения" },
    { id: "lpu", name: "ЛПУ" },
    { id: "specialist", name: "Ожидаемый специалист" },
    { id: "dueDate", name: "До даты" },
    { id: "decision", name: "Решение" },
    { id: "decisionDate", name: "Дата решения" },
];

interface WaitingListTableProps {
    rows: WaitingRow[];
    page: number;
    pageSize: number;
    sortState: TableSortState;
    highlightId?: string | null;
    onSortStateChange: (sortState: TableSortState) => void;
    onRowClick: (row: WaitingRow) => void;
}

export function WaitingListTable({
    rows,
    page,
    pageSize,
    sortState,
    highlightId,
    onSortStateChange,
    onRowClick,
}: WaitingListTableProps) {
    const columns = useMemo<TableColumnConfig<WaitingRow>[]>(
        () => [
            {
                id: "index",
                name: "№",
                width: 60,
                template: (_row, index) => (page - 1) * pageSize + index + 1,
            },
            ...BASE_COLUMNS,
        ],
        [page, pageSize],
    );

    return (
        <SortableTable
            data={rows}
            columns={columns}
            getRowId={(row) => row.id}
            getRowDescriptor={(row) =>
                row.id === highlightId ? { classNames: ["waiting-row--highlight"] } : undefined
            }
            edgePadding
            width="max"
            onRowClick={onRowClick}
            sortState={sortState}
            onSortStateChange={onSortStateChange}
            disableDataSorting
        />
    );
}
