import {
    CollectionResponse,
    SongFavoritePatchRequest,
    SongResponse,
    SongSearchRequest,
} from "../types";
import { BaseApiService } from "./base-api.service";
import { IMusicApiService } from "./imusic-api.service";

export class MusicApiService
    extends BaseApiService
    implements IMusicApiService
{
    private readonly songSegment: string = "/v1/song";

    async searchSongs(
        request: SongSearchRequest = {} as SongSearchRequest
    ): Promise<[CollectionResponse<SongResponse>, Error]> {
        const params: URLSearchParams = new URLSearchParams();

        if (request.artist) {
            params.append("artist", request.artist);
        }

        if (typeof request.isFavorite === "boolean") {
            params.append("isFavorite", request.isFavorite.toString());
        }

        if (request.sortBy) {
            params.append("sortBy", request.sortBy);
        }

        if (request.title) {
            params.append("title", request.title);
        }

        return this.get(`${this.songSegment}?${params.toString()}`);
    }

    async getSong(id: string): Promise<[SongResponse, Error]> {
        return this.get<SongResponse>(`${this.songSegment}/${id}`);
    }

    async updateFavoriteSong(
        id: string,
        request: SongFavoritePatchRequest
    ): Promise<[SongResponse, Error]> {
        return this.patch(`${this.songSegment}/${id}/favorite`, request);
    }

    async deleteSong(id: string): Promise<[void, Error]> {
        return this.delete(`${this.songSegment}/${id}`);
    }
}
