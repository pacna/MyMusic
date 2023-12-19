import { Context, createContext } from "react";
import { AudioPlayerInfo } from "../types/local";

export const AudioPlayerContext: Context<AudioPlayerInfo> = createContext(
    {} as AudioPlayerInfo
);
