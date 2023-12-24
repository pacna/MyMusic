import { SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    defaultValue: T
): [T, (value: SetStateAction<T>) => void] {
    const getInitialState = (): T => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    };

    const [cache, setCache] = useState<T>(getInitialState());

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(cache ?? defaultValue));
    }, [key, cache]);

    return [cache, setCache];
}
