import { SongResponse } from "@shared/types/api";

export type SongRowDetailConfig =
    | Pick<
          SongResponse,
          "id" | "path" | "title" | "artist" | "length" | "isFavorite"
      > & {
          index: number;
      };
