import { SongResponse } from "@mymusic/types";

export type SongRowDetailConfig =
    | Pick<
          SongResponse,
          "id" | "path" | "title" | "artist" | "length" | "isFavorite"
      > & {
          index: number;
      };
