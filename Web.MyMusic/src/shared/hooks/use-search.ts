import { useContext, useEffect, useState } from "react";
import { IMusicApiService } from "../services";
import {
    CollectionResponse,
    SongResponse,
    SongSearchRequest,
} from "../types/api";
import { ServiceApiContext } from "../contexts";

export function useSearch(
    request: SongSearchRequest
): CollectionResponse<SongResponse> {
    const service: IMusicApiService =
        useContext<IMusicApiService>(ServiceApiContext);

    const [collection, setCollection] = useState<
        CollectionResponse<SongResponse>
    >({ list: [], total: 0 } as CollectionResponse<SongResponse>);

    useEffect((): void => {
        (async () => {
            const [collection, _]: [CollectionResponse<SongResponse>, Error] =
                await service.searchSongs(request);

            setCollection(collection);
        })();
    }, [request]);

    return collection;
}
