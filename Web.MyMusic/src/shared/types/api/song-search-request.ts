import { BaseCollectionRequest } from "./base-collection-request";

export type SongSearchRequest = BaseCollectionRequest & {
    sortBy: string;
    title: string;
    artist: string;
    isFavorite: boolean;
};
