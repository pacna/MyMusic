import {
    CollectionResponse,
    SongFavoritePatchRequest,
    SongPostRequest,
    SongPutRequest,
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

        if (typeof request.idx === "number") {
            params.append("idx", request.idx.toString());
        }

        if (typeof request.qty === "number") {
            params.append("qty", request.qty.toString());
        }

        return this.get(`${this.songSegment}?${params.toString()}`);
    }

    async createSong(request: SongPostRequest): Promise<[SongResponse, Error]> {
        return this.post(this.songSegment, request);
    }

    async getSong(id: string): Promise<[SongResponse, Error]> {
        return this.get<SongResponse>(`${this.songSegment}/${id}`);
    }

    async updateSong(
        id: string,
        request: SongPutRequest
    ): Promise<[SongResponse, Error]> {
        return this.put(`${this.songSegment}/${id}`, request);
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
