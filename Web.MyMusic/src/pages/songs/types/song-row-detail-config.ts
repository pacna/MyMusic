import { SongResponse } from "@mymusic/shared/types";

export type SongRowDetailConfig =
    | Pick<
          SongResponse,
          "id" | "path" | "title" | "artist" | "length" | "isFavorite"
      > & {
          index: number;
      };
