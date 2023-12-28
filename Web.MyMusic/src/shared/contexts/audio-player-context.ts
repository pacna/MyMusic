import { Context, createContext } from "react";
import { AudioPlayerContextConfig } from "../types/local";

export const AudioPlayerContext: Context<AudioPlayerContextConfig> =
    createContext({} as AudioPlayerContextConfig);
