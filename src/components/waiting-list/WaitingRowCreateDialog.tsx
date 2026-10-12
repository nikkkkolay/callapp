import { useState } from "react";
import { Dialog, Select, Text, TextInput } from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";

import {
    CATEGORY_OPTIONS,
    DECISION_OPTIONS,
    PRIORITY_OPTIONS,
    SPECIALITY_OPTIONS,
    STATUS_OPTIONS,
    type WaitingRow,
} from "../../mocks/waitingList";
import { getRoleLabel } from "../../mocks/currentUser";
import { formatDate, parseDate } from "../../utils/waitingList";

interface WaitingRowDialogProps {
    row: WaitingRow | null;
    open: boolean;
    onClose: () => void;
    onSave: (row: WaitingRow) => Promise<void> | void;
}

export function WaitingRowCreateDialog({ row, open, onClose, onSave }: WaitingRowDialogProps) {
    const [draft, setDraft] = useState<WaitingRow | null>(row);
    const [saving, setSaving] = useState(false);

    if (!draft) {
        return null;
    }

    const set = <K extends keyof WaitingRow>(field: K, value: WaitingRow[K]) =>
        setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(draft);
        } catch {
            // Ошибку показывает родитель (тост), карточку не закрываем.
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="l" fullWidth>
            <Dialog.Header caption={`Обращение №${draft.id}`} />
            <Dialog.Body>
                <div className="row-form">
                    <TextInput
                        label="Пациент:"
                        size="xl"
                        hasClear
                        disabled
                        className="row-form__full"
                        value={draft.patient}
                        readOnly
                    />
                    <Select
                        label="Статус:"
                        size="l"
                        disabled={saving}
                        options={STATUS_OPTIONS}
                        value={[draft.status]}
                        onUpdate={(value) => set("status", value[0] ?? "")}
                    />
                    <Select
                        label="Приоритет:"
                        size="l"
                        disabled={saving}
                        options={PRIORITY_OPTIONS}
                        value={[draft.priority]}
                        onUpdate={(value) => set("priority", value[0] ?? "")}
                    />
                    <DatePicker
                        label="Дата инцидента:"
                        size="l"
                        hasClear
                        disabled={saving}
                        format="DD.MM.YYYY"
                        value={parseDate(draft.incidentDate)}
                        onUpdate={(value) => set("incidentDate", formatDate(value))}
                    />
                    <Select
                        label="Категория:"
                        size="l"
                        disabled={saving}
                        options={CATEGORY_OPTIONS}
                        value={[draft.category]}
                        onUpdate={(value) => set("category", value[0] ?? "")}
                    />
                    <Select
                        label="Ожидаемый специалист:"
                        size="l"
                        disabled={saving}
                        options={SPECIALITY_OPTIONS}
                        value={[draft.specialist]}
                        onUpdate={(value) => set("specialist", value[0] ?? "")}
                    />
                    <TextInput
                        label="ЛПУ:"
                        size="l"
                        hasClear
                        disabled={saving}
                        value={draft.lpu}
                        onUpdate={(value) => set("lpu", value)}
                    />
                    <TextInput
                        label="Причина обращения:"
                        size="l"
                        hasClear
                        disabled={saving}
                        className="row-form__full"
                        value={draft.reason}
                        onUpdate={(value) => set("reason", value)}
                    />
                    <DatePicker
                        label="До даты:"
                        size="l"
                        hasClear
                        disabled={saving}
                        format="DD.MM.YYYY"
                        value={parseDate(draft.dueDate)}
                        onUpdate={(value) => set("dueDate", formatDate(value))}
                    />
                    <Select
                        label="Решение:"
                        size="l"
                        disabled={saving}
                        options={DECISION_OPTIONS}
                        value={[draft.decision]}
                        onUpdate={(value) => set("decision", value[0] ?? "")}
                    />
                    <DatePicker
                        label="Дата решения:"
                        size="l"
                        hasClear
                        disabled={saving}
                        format="DD.MM.YYYY"
                        value={parseDate(draft.decisionDate)}
                        onUpdate={(value) => set("decisionDate", formatDate(value))}
                    />
                </div>
                <div className="row-form__meta">
                    <div className="row-form__meta-top">
                        <Text variant="subheader-1">
                            {getRoleLabel(draft.createdByRole)}: {draft.createdBy}
                        </Text>
                    </div>
                </div>
            </Dialog.Body>
            <Dialog.Footer
                onClickButtonApply={() => void handleSave()}
                onClickButtonCancel={onClose}
                textButtonApply="Сохранить"
                textButtonCancel="Отмена"
                loading={saving}
            />
        </Dialog>
    );
}
