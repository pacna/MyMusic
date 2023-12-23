import { SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<K extends string, V>(
    key: K,
    defaultValue: V
): [V, (value: SetStateAction<V>) => void] {
    const getInitialState = (): V => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    };

    const [cache, setCache] = useState<V>(getInitialState());

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(cache ?? defaultValue));
    }, [key, cache]);

    return [cache, setCache];
}
