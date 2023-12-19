import { ReactElement, useReducer } from "react";
import { AudioPlayer } from "./audio-player";
import { NavSidebar } from "./nav-sidebar";
import { AudioPlayerContext } from "../contexts/audio-player-context";
import { AudioPlayerInfo } from "../types/local";

function audioPlayerReducer(
    state: AudioPlayerInfo,
    action: { property: string; payload: any }
): AudioPlayerInfo {
    switch (action.property) {
        case "id":
            return {
                ...state,
                id: action.payload,
            };
        case "showWave":
            return {
                ...state,
                showWave: action.payload,
            };
        case "path":
            return {
                ...state,
                path: action.payload,
            };
        default:
            return state;
    }
}

export const Layout = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}): ReactElement => {
    const [audioPlayerState, audioPlayerDispatch] = useReducer(
        audioPlayerReducer,
        {} as AudioPlayerInfo
    );
    return (
        <AudioPlayerContext.Provider value={{} as AudioPlayerInfo}>
            <NavSidebar />
            <main>{children}</main>
            <AudioPlayer />
        </AudioPlayerContext.Provider>
    );
};
