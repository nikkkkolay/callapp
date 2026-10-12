import type { SelectOption } from "@gravity-ui/uikit";

import type { UserRole } from "./currentUser";

export interface WaitingRow {
    id: string;
    status: string;
    priority: string;
    incidentDate: string;
    patient: string;
    category: string;
    reason: string;
    lpu: string;
    specialist: string;
    dueDate: string;
    decision: string;
    decisionDate: string;
    lo?: string;
    birthDate?: string;
    createdBy: string;
    createdByRole: UserRole;
    updatedBy?: string;
}

export const WAITING_ROWS: WaitingRow[] = [
    {
        id: "1",
        status: "Новая",
        priority: "Высокий",
        incidentDate: "02.10.2026",
        patient: "Петров Пётр Петрович",
        category: "Экстренная",
        reason: "Боль в груди",
        lpu: "Поликлиника №1",
        specialist: "Кардиолог",
        dueDate: "05.10.2026",
        decision: "Записать",
        decisionDate: "02.10.2026",
        createdBy: "Николай Нидворай",
        createdByRole: "operator",
    },
    {
        id: "2",
        status: "В работе",
        priority: "Высокий",
        incidentDate: "02.10.2026",
        patient: "Петров Пётр Петрович",
        category: "Экстренная",
        reason: "Боль в груди",
        lpu: "Поликлиника №1",
        specialist: "Кардиолог",
        dueDate: "05.10.2026",
        decision: "Записать",
        decisionDate: "02.10.2026",
        createdBy: "Николай Нидворай",
        createdByRole: "operator",
    },
    {
        id: "3",
        status: "Записан на прием",
        priority: "Высокий",
        incidentDate: "02.10.2026",
        patient: "Петров Пётр Петрович",
        category: "Экстренная",
        reason: "Боль в груди",
        lpu: "Поликлиника №1",
        specialist: "Кардиолог",
        dueDate: "05.10.2026",
        decision: "Записать",
        decisionDate: "02.10.2026",
        createdBy: "Николай Нидворай",
        createdByRole: "operator",
    },
    {
        id: "4",
        status: "Закрыта",
        priority: "Высокий",
        incidentDate: "02.10.2026",
        patient: "Петров Пётр Петрович",
        category: "Экстренная",
        reason: "Боль в груди",
        lpu: "Поликлиника №1",
        specialist: "Кардиолог",
        dueDate: "05.10.2026",
        decision: "Записать",
        decisionDate: "02.10.2026",
        createdBy: "Николай Нидворай",
        createdByRole: "operator",
    },
    {
        id: "5",
        status: "Отменена",
        priority: "Высокий",
        incidentDate: "02.10.2026",
        patient: "Петров Пётр Петрович",
        category: "Экстренная",
        reason: "Боль в груди",
        lpu: "Поликлиника №1",
        specialist: "Кардиолог",
        dueDate: "05.10.2026",
        decision: "Записать",
        decisionDate: "02.10.2026",
        createdBy: "Николай Нидворай",
        createdByRole: "operator",
    },
];

// Согласованы названия пяти состояний заявки: Новая, В работе, Записан на прием, Закрыта, Отменена.

export const STATUS_OPTIONS: SelectOption[] = [
    { value: "Новая", content: "Новая" },
    { value: "В работе", content: "В работе" },
    { value: "Записан на прием", content: "Записан на прием" },
    { value: "Закрыта", content: "Закрыта" },
    { value: "Отменена", content: "Отменена" },
];

export const PRIORITY_OPTIONS: SelectOption[] = [
    { value: "Высокий", content: "Высокий" },
    { value: "Средний", content: "Средний" },
    { value: "Низкий", content: "Низкий" },
];

export const CATEGORY_OPTIONS: SelectOption[] = [
    { value: "Плановая", content: "Плановая" },
    { value: "Экстренная", content: "Экстренная" },
];

export const DECISION_OPTIONS: SelectOption[] = [
    { value: "Записать", content: "Записать" },
    { value: "Отклонить", content: "Отклонить" },
];

export const SPECIALITY_OPTIONS: SelectOption[] = [
    { value: "Терапевт", content: "Терапевт" },
    { value: "Кардиолог", content: "Кардиолог" },
    { value: "Невролог", content: "Невролог" },
    { value: "Хирург", content: "Хирург" },
    { value: "Травматолог", content: "Травматолог" },
    { value: "Эндокринолог", content: "Эндокринолог" },
    { value: "Пульмонолог", content: "Пульмонолог" },
    { value: "Окулист", content: "Окулист" },
];

export const LPU_OPTIONS: SelectOption[] = [
    { value: "Поликлиника №1", content: "Поликлиника №1" },
    { value: "Поликлиника №2", content: "Поликлиника №2" },
    { value: "Поликлиника №3", content: "Поликлиника №3" },
];
