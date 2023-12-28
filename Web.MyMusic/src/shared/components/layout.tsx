import { ReactElement, useReducer } from "react";
import { AudioPlayer } from "./audio-player";
import { NavSidebar } from "./nav-sidebar";
import { AudioPlayerContext } from "../contexts/audio-player-context";
import { AudioPlayerInfo } from "../types/local";

function audioPlayerReducer(
    state: AudioPlayerInfo,
    action: {
        property: string | string[];
        payload: string | boolean | AudioPlayerInfo;
    }
): AudioPlayerInfo {
    if (Array.isArray(action.property)) {
        return {
            ...state,
            ...Object.fromEntries(
                action.property.map((p: string) => [
                    p,
                    (action.payload as AudioPlayerInfo)[p] ?? state[p],
                ])
            ),
        };
    }

    switch (action.property) {
        case "id":
            return {
                ...state,
                id: action.payload as string,
            };
        case "visible":
            return {
                ...state,
                visible: action.payload as boolean,
            };
        case "path":
            return {
                ...state,
                path: action.payload as string,
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
        <AudioPlayerContext.Provider
            value={{ audioPlayerState, audioPlayerDispatch }}
        >
            <NavSidebar />
            <main>{children}</main>
            <AudioPlayer />
        </AudioPlayerContext.Provider>
    );
};
