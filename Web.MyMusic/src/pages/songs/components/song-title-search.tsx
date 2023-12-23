import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Color } from "@mymusic/types/local";
import { SongSearchRequest } from "@mymusic/types/api";
import { useLocalStorage } from "@mymusic/hooks";

const debounce = (fn: (...event: any[]) => void, ms: number) => {
    let timeout: any;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};

export const SongTitleSearch = ({
    searchAndSetSongs,
}: {
    searchAndSetSongs: (request: SongSearchRequest) => Promise<void>;
}): ReactElement => {
    const [cache, setCache] = useLocalStorage<string, string>("search", "");
    const [title, setTitle] = useState<string>(cache);

    const searchTitleName = debounce(
        (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTitle(evt.target.value);
            searchAndSetSongs({
                title: evt.target.value,
                sortBy: "title:asc",
            } as SongSearchRequest);
        },
        300
    );

    useEffect(() => {
        const cacheBeforeReload = () => {
            setCache(title);
        };

        window.addEventListener("beforeunload", cacheBeforeReload);

        return () =>
            window.removeEventListener("beforeunload", cacheBeforeReload);
    }, [title]);

    return (
        <form style={{ maxWidth: "300px", justifySelf: "end" }}>
            <TextField
                variant="standard"
                onChange={searchTitleName}
                defaultValue={title}
                sx={{
                    "& .MuiInputBase-root": {
                        "&.Mui-focused::after": {
                            borderColor: Color.BlueMarguerite,
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};
