import { useContext, useEffect, useMemo, useState } from "react";
import { IMusicApiService } from "../services";
import {
    CollectionResponse,
    SongResponse,
    SongSearchRequest,
} from "../types/api";
import { ServiceApiContext } from "../contexts";

export function useSearch(
    request: SongSearchRequest
): [CollectionResponse<SongResponse>, () => void] {
    const [forceUpdate, setForceUpdate] = useState<number>(0);
    const cacheRequest: SongSearchRequest = useMemo(
        () => request,
        [request.title, request.idx]
    );
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);

    const [collection, setCollection] = useState<
        CollectionResponse<SongResponse>
    >({ list: [], total: 0 } as CollectionResponse<SongResponse>);

    useEffect((): void => {
        (async () => {
            const [collection, _]: [CollectionResponse<SongResponse>, Error] =
                await service.searchSongs(cacheRequest);

            setCollection(collection);
        })();
    }, [cacheRequest, forceUpdate]);

    return [collection, () => setForceUpdate((prev: number) => prev + 1)];
}
