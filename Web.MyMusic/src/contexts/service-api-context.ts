import { Context, createContext } from "react";
import { IMusicApiService } from "../services/imusic-api.service";

export const ServiceApiContext: Context<IMusicApiService> = createContext(
    {} as IMusicApiService
);
