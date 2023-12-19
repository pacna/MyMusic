import { SongResponse } from "../../../types";

export type SongRowDetailConfig =
    | Pick<SongResponse, "title" | "artist" | "length"> & { index: number };
