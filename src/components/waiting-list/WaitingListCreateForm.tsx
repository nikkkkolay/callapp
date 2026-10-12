import { useState } from "react";
import { Button, Select, TextInput } from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import type { DateTime } from "@gravity-ui/date-utils";

import { DECISION_OPTIONS, LPU_OPTIONS, SPECIALITY_OPTIONS } from "../../mocks/waitingList";

export interface CreateFormValues {
    lo: string;
    surname: string;
    birthDate: DateTime | null;
    date: DateTime | null;
    speciality: string;
    lpu: string;
    reason: string;
    decision: string;
}

type FormErrors = Partial<Record<keyof CreateFormValues, string>>;

const EMPTY_FORM: CreateFormValues = {
    lo: "",
    surname: "",
    birthDate: null,
    date: null,
    speciality: "",
    lpu: "",
    reason: "",
    decision: "",
};

const REQUIRED_MESSAGE = "Обязательное поле";

function validate(values: CreateFormValues): FormErrors {
    const errors: FormErrors = {};
    if (!values.lo.trim()) errors.lo = REQUIRED_MESSAGE;
    if (!values.surname.trim()) errors.surname = REQUIRED_MESSAGE;
    if (!values.birthDate) errors.birthDate = REQUIRED_MESSAGE;
    if (!values.speciality) errors.speciality = REQUIRED_MESSAGE;
    if (!values.lpu) errors.lpu = REQUIRED_MESSAGE;
    if (!values.reason.trim()) errors.reason = REQUIRED_MESSAGE;
    if (!values.decision) errors.decision = REQUIRED_MESSAGE;
    return errors;
}

function toSelection(value: string): string[] {
    return value ? [value] : [];
}

export function WaitingListForm({
    onSubmit,
}: {
    onSubmit: (values: CreateFormValues) => Promise<void> | void;
}) {
    const [form, setForm] = useState<CreateFormValues>(EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [saving, setSaving] = useState(false);

    const set = <K extends keyof CreateFormValues>(field: K, value: CreateFormValues[K]) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

    const handleSubmit = async () => {
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            return;
        }

        setSaving(true);
        try {
            await onSubmit(form);
            setForm(EMPTY_FORM);
            setErrors({});
        } catch {
            // Ошибку показывает родитель (тост), форму не сбрасываем.
        } finally {
            setSaving(false);
        }
    };

    const handleClear = () => {
        setForm(EMPTY_FORM);
        setErrors({});
    };

    const invalid = (field: keyof CreateFormValues) =>
        errors[field] ? ("invalid" as const) : undefined;

    return (
        <form
            className="waiting-form"
            onSubmit={(event) => {
                event.preventDefault();
                void handleSubmit();
            }}
        >
            <TextInput
                size="l"
                hasClear
                disabled={saving}
                placeholder="Номер ЛО"
                value={form.lo}
                onUpdate={(value) => set("lo", value)}
                validationState={invalid("lo")}
                errorMessage={errors.lo}
            />
            <TextInput
                size="l"
                hasClear
                disabled={saving}
                placeholder="ФИО"
                value={form.surname}
                onUpdate={(value) => set("surname", value)}
                validationState={invalid("surname")}
                errorMessage={errors.surname}
            />
            <DatePicker
                size="l"
                hasClear
                disabled={saving}
                format="DD.MM.YYYY"
                placeholder="Дата рождения"
                value={form.birthDate}
                onUpdate={(value) => set("birthDate", value)}
                validationState={invalid("birthDate")}
                errorMessage={errors.birthDate}
            />
            <Select
                size="l"
                hasClear
                disabled={saving}
                placeholder="Специальность врача"
                options={SPECIALITY_OPTIONS}
                value={toSelection(form.speciality)}
                onUpdate={(value) => set("speciality", value[0] ?? "")}
                validationState={invalid("speciality")}
                errorMessage={errors.speciality}
                width="max"
            />
            <Select
                size="l"
                hasClear
                disabled={saving}
                placeholder="ЛПУ"
                options={LPU_OPTIONS}
                value={toSelection(form.lpu)}
                onUpdate={(value) => set("lpu", value[0] ?? "")}
                validationState={invalid("lpu")}
                errorMessage={errors.lpu}
                width="max"
            />
            <TextInput
                size="l"
                hasClear
                disabled={saving}
                placeholder="Причина обращения"
                value={form.reason}
                onUpdate={(value) => set("reason", value)}
                validationState={invalid("reason")}
                errorMessage={errors.reason}
            />
            <Select
                size="l"
                hasClear
                disabled={saving}
                placeholder="Принятое решение"
                options={DECISION_OPTIONS}
                value={toSelection(form.decision)}
                onUpdate={(value) => set("decision", value[0] ?? "")}
                validationState={invalid("decision")}
                errorMessage={errors.decision}
                width="max"
            />
            <div className="waiting-form__actions">
                <Button
                    view="outlined"
                    size="l"
                    type="button"
                    disabled={saving}
                    onClick={handleClear}
                >
                    Очистить
                </Button>
                <Button view="action" size="l" type="submit" loading={saving}>
                    Создать обращение
                </Button>
            </div>
        </form>
    );
}
