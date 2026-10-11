import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = window.localStorage.getItem(key);
            return raw === null ? initialValue : (JSON.parse(raw) as T);
        } catch {
            return initialValue;
        }
    });

    const set = useCallback(
        (next: T | ((prev: T) => T)) => {
            setValue((prev) => {
                const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
                try {
                    window.localStorage.setItem(key, JSON.stringify(resolved));
                } catch {
                    /* storage unavailable */
                }
                return resolved;
            });
        },
        [key],
    );

    return [value, set] as const;
}
