export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

interface MockSaveOptions {
    /** Задержка, имитирующая запрос к серверу. */
    delay?: number;
    /** Имитация серверной ошибки (для проверки обработки). */
    shouldFail?: boolean;
    /** Текст ошибки, если shouldFail = true. */
    errorMessage?: string;
}

/**
 * Имитация сохранения на сервере. Заменить на реальный запрос.
 */
export async function mockSave<T>(data: T, options: MockSaveOptions = {}): Promise<T> {
    const { delay: wait = 1000, shouldFail = false, errorMessage = "Ошибка сервера" } = options;

    await delay(wait);

    if (shouldFail) {
        throw new Error(errorMessage);
    }

    return data;
}
