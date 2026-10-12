import { useEffect, useMemo, useState } from "react";
import { Pagination, useToaster, type TableSortState } from "@gravity-ui/uikit";
import { dateTime } from "@gravity-ui/date-utils";

import { WAITING_ROWS, type WaitingRow } from "../mocks/waitingList";
import { CURRENT_USER } from "../mocks/currentUser";
import { formatDate, sortRows } from "../utils/waitingList";
import { mockSave } from "../utils/mockRequest";
import {
    WaitingListForm,
    type CreateFormValues,
} from "../components/waiting-list/WaitingListCreateForm";
import { WaitingListTable } from "../components/waiting-list/WaitingListTable";
import { WaitingRowDialog } from "../components/waiting-list/WaitingRowEditDialog";

const HIGHLIGHT_TIMEOUT = 2600;

export function WaitingList() {
    const toaster = useToaster();
    const [rows, setRows] = useState<WaitingRow[]>(WAITING_ROWS);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [sortState, setSortState] = useState<TableSortState>([]);
    const [highlightId, setHighlightId] = useState<string | null>(null);
    const [editingRow, setEditingRow] = useState<WaitingRow | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [openCounter, setOpenCounter] = useState(0);

    useEffect(() => {
        if (!highlightId) {
            return;
        }
        const timer = setTimeout(() => setHighlightId(null), HIGHLIGHT_TIMEOUT);
        return () => clearTimeout(timer);
    }, [highlightId]);

    const sortedRows = useMemo(() => sortRows(rows, sortState), [rows, sortState]);

    const data = useMemo(
        () => sortedRows.slice((page - 1) * pageSize, page * pageSize),
        [sortedRows, page, pageSize],
    );

    const showSaveError = (error: unknown) => {
        toaster.add({
            name: "save-error",
            title: "Не удалось сохранить",
            content: error instanceof Error ? error.message : "Неизвестная ошибка",
            theme: "danger",
            autoHiding: 5000,
        });
    };

    const handleCreate = async (values: CreateFormValues) => {
        const nextId = String(rows.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0) + 1);
        const dateStr = values.date ? formatDate(values.date) : formatDate(dateTime());

        const newRow: WaitingRow = {
            id: nextId,
            status: "В ожидании",
            priority: "Средний",
            incidentDate: dateStr,
            patient: values.surname,
            category: "Плановая",
            reason: values.reason,
            lpu: values.lpu,
            specialist: values.speciality,
            dueDate: dateStr,
            decision: values.decision,
            decisionDate: dateStr,
            lo: values.lo,
            birthDate: formatDate(values.birthDate),
            createdBy: CURRENT_USER.name,
            createdByRole: CURRENT_USER.role,
        };

        try {
            await mockSave(newRow);
        } catch (error) {
            showSaveError(error);
            throw error;
        }

        setRows((prev) => [newRow, ...prev]);
        setPage(1);
        setHighlightId(newRow.id);
        toaster.add({
            name: "create-waiting",
            title: "Запись создана",
            content: `Номер ЛО: ${values.lo} · Пациент: ${values.surname}`,
            theme: "success",
            autoHiding: 3000,
        });
    };

    const handleRowClick = (row: WaitingRow) => {
        setEditingRow(row);
        setOpenCounter((counter) => counter + 1);
        setDialogOpen(true);
    };

    const handleSave = async (updated: WaitingRow) => {
        const stamped: WaitingRow = {
            ...updated,
            updatedBy: CURRENT_USER.name,
        };

        try {
            await mockSave(stamped);
        } catch (error) {
            showSaveError(error);
            throw error;
        }

        setRows((prev) => prev.map((item) => (item.id === stamped.id ? stamped : item)));
        setDialogOpen(false);
        toaster.add({
            name: "update-waiting",
            title: "Изменения сохранены",
            theme: "success",
            autoHiding: 3000,
        });
    };

    return (
        <div className="waiting">
            {/* <Text variant="header-1">Лист контроля</Text> */}
            <WaitingListForm onSubmit={handleCreate} />

            <div className="waiting-table">
                <WaitingListTable
                    rows={data}
                    page={page}
                    pageSize={pageSize}
                    sortState={sortState}
                    highlightId={highlightId}
                    onSortStateChange={setSortState}
                    onRowClick={handleRowClick}
                />
            </div>

            <div className="waiting-pagination">
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={rows.length}
                    onUpdate={(nextPage, nextPageSize) => {
                        setPage(nextPage);
                        setPageSize(nextPageSize);
                    }}
                />
            </div>

            <WaitingRowDialog
                key={`${editingRow?.id ?? "empty"}-${openCounter}`}
                row={editingRow}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}
