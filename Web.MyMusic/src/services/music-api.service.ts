import { MusicResponse } from "../types";
import { BaseApiService } from "./base-api.service";
import { IMusicApiService } from "./imusic-api.service";

export class MusicApiService
    extends BaseApiService
    implements IMusicApiService
{
    private readonly musicSegment: string = "/v1/music";

    async getMusic(id: string): Promise<[MusicResponse, Error]> {
        return this.get<MusicResponse>(`${this.musicSegment}/${id}`);
    }

    async deleteMusic(id: string): Promise<[void, Error]> {
        return this.delete(`${this.musicSegment}/${id}`);
    }
}
